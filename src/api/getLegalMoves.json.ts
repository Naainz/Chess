// src/pages/api/getLegalMoves.ts
import type { APIRoute } from 'astro';

export const get: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const piece = url.searchParams.get('piece');
  const row = parseInt(url.searchParams.get('row') || '0', 10);
  const col = parseInt(url.searchParams.get('col') || '0', 10);

  const getLegalMoves = (piece: string, row: number, col: number) => {
    let moves = [];
    switch (piece.toLowerCase()) {
      case 'p':
        if (piece === 'P') {
          if (row > 0) moves.push([row - 1, col]);
          if (row === 6) moves.push([row - 2, col]);
        } else {
          if (row < 7) moves.push([row + 1, col]);
          if (row === 1) moves.push([row + 2, col]);
        }
        break;
      case 'r':
        for (let i = 1; i < 8; i++) {
          moves.push([row + i, col], [row - i, col], [row, col + i], [row, col - i]);
        }
        break;
      case 'n':
        moves.push(
          [row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1],
          [row + 1, col + 2], [row + 1, col - 2], [row - 1, col + 2], [row - 1, col - 2]
        );
        break;
      case 'b':
        for (let i = 1; i < 8; i++) {
          moves.push(
            [row + i, col + i], [row + i, col - i], [row - i, col + i], [row - i, col - i]
          );
        }
        break;
      case 'q':
        for (let i = 1; i < 8; i++) {
          moves.push(
            [row + i, col], [row - i, col], [row, col + i], [row, col - i],
            [row + i, col + i], [row + i, col - i], [row - i, col + i], [row - i, col - i]
          );
        }
        break;
      case 'k':
        moves.push(
          [row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1],
          [row + 1, col + 1], [row + 1, col - 1], [row - 1, col + 1], [row - 1, col - 1]
        );
        break;
    }
    return moves.filter(move => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8);
  };

  const moves = getLegalMoves(piece, row, col);
  return new Response(JSON.stringify({ moves }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
