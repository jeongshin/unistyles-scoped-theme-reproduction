import {useEffect, useMemo, useRef, useState} from 'react';

function nextFrame(): Promise<number> {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

function chunkString(text: string, size: number): string[] {
  if (size <= 1) return Array.from(text);
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

function useStreamTokens(tokens: string[]) {
  const [chunks, setChunks] = useState<string[]>([]);
  const runIdRef = useRef(0);

  useEffect(() => {
    const myRunId = ++runIdRef.current;

    setChunks([]);

    async function stream() {
      for (let i = 0; i < tokens.length; i++) {
        if (myRunId !== runIdRef.current) return;
        setChunks(prev =>
          myRunId !== runIdRef.current ? prev : [...prev, tokens[i]!],
        );
        await nextFrame();
      }
    }

    stream();

    return () => {
      runIdRef.current++;
    };
  }, [tokens]);

  return {chunks};
}

export function useStreamText(text: string, chunkSize = 1) {
  const tokens = useMemo(() => chunkString(text, chunkSize), [text, chunkSize]);
  return useStreamTokens(tokens);
}

export function useStreamTextByWord(text: string) {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  return useStreamTokens(tokens);
}
