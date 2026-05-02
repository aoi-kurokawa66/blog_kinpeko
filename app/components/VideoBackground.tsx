"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  hideMobileImage?: boolean; // スマホで画像を非表示にしてグラデーションにするか
  lazy?: boolean; // 遅延読み込みするか（デフォルト: true）
}

export default function VideoBackground({ src, poster, className = "", hideMobileImage = false, lazy = true }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazy);
  const [shouldLoadImage, setShouldLoadImage] = useState(!lazy);
  // 初期状態はtrue（モバイルと仮定）で、クライアント側で再評価する（SSR対応）
  const [isMobile, setIsMobile] = useState(true);
  const imageLoadedRef = useRef(false);

  // モバイル判定（初回レンダリング時とリサイズ時）
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初回レンダリング時に判定
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // lazy=falseの場合は即座に読み込む
    if (!lazy) {
      if (poster && !hideMobileImage) {
        setShouldLoadImage(true);
      }
      return;
    }

    // モバイルでは動画を読み込まないが、画像は読み込む必要がある
    if (isMobile) {
      setShouldLoadVideo(false);
      // モバイルで画像が必要な場合、IntersectionObserverで画像を読み込む
      if (poster && !hideMobileImage && !shouldLoadImage) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setShouldLoadImage(true);
                observer.disconnect();
              }
            });
          },
          {
            rootMargin: "300px", // 大きくして早めに読み込み開始
            threshold: 0.01, // 少しでも見えたら読み込み
          }
        );

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return () => {
          observer.disconnect();
        };
      }
      return;
    }

    if (shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            // 画像も同時に読み込み開始
            if (poster && !hideMobileImage) {
              setShouldLoadImage(true);
            }
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "300px", // 大きくして早めに読み込み開始
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, shouldLoadVideo, shouldLoadImage, poster, hideMobileImage, isMobile]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* モバイル用背景（768px未満で表示） */}
      {hideMobileImage ? (
        // 白背景（ヒーローセクション用）
        <div
          className="absolute inset-0 md:hidden bg-white"
          aria-hidden="true"
        />
      ) : (
        // 画像背景（他のセクション用）
        poster && shouldLoadImage && (
          <Image
            src={poster}
            alt=""
            fill
            className="object-cover md:hidden"
            priority={!lazy}
            onLoad={() => {
              imageLoadedRef.current = true;
            }}
            aria-hidden="true"
          />
        )
      )}
      
      {/* 表示用動画（768px以上で表示、モバイルでは完全にレンダリングしない、prefers-reduced-motionでは非表示） */}
      {!isMobile && shouldLoadVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="video-background absolute min-w-full min-h-full w-auto h-auto object-cover hidden md:block"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        >
          <source src={src} type="video/mp4" />
          {/* フォールバック：ブラウザが動画をサポートしない場合 */}
        </video>
      )}
    </div>
  );
}
