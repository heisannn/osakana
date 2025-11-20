"use client";

import { useState, useEffect } from 'react';

interface KanjiSplitterProps {
  char?: string;
  width?: number;
  isHidden: boolean;
}

export default function KanjiSplitter({
  char = "鰯",
  width = 128,
  isHidden = true
}: KanjiSplitterProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);


  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchKanji = async () => {
      try {
        setError(false);
        if (!char) return;
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) throw new Error("Invalid character");

        const hex = codePoint.toString(16).padStart(5, '0');
        const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("SVG Data not found");
        const text = await response.text();

        const start = text.indexOf('<svg');
        const cleanSvg = start > -1 ? text.substring(start) : text;

        if (isMounted) setSvgContent(cleanSvg);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(true);
      }
    };
    fetchKanji();
    return () => { isMounted = false; };
  }, [char]);

  if (error) return <div className="text-red-500 text-sm">Error</div>;
  if (!svgContent) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded animate-pulse text-gray-400 text-xs"
        style={{ width, height: width }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl w-fit">
      <div
        style={{ width, height: width }}
        className={`
          /* 全体の基本スタイル */
          flex
          justify-center
          items-center
          [&_text]:hidden
          [&_path]:fill-none 
          [&_path]:stroke-[6] 
          [&_path]:stroke-linecap-round 
          [&_path]:stroke-linejoin-round
          [&_path]:stroke-gray-800 /* デフォルトの文字色 */

          /* グループ(gタグ)に対してトランジションを設定 */
          [&_g]:transition-opacity [&_g]:duration-500 [&_g]:ease-in-out
          
          /* ▼ ここで表示・非表示を制御 ▼
             isRightHidden が true の場合:
             IDが "-g2" で終わるグループ（右側/第2要素）の不透明度を0にする
          */
          ${isHidden
            ? '[&_g[id$="-g6"]]:opacity-0  bg-white '
            : '[&_g[id$="-g2"]]:opacity-100 bg-green-300'
          }
        `}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

    </div>
  );
}
