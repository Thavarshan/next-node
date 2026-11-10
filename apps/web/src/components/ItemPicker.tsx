"use client";

import { memo, useState } from "react";

const ITEMS = ["p1", "p2", "p3"];

type RowProps = {
  id: string;
  onItemClick: (id: string) => void;
  onRowRender?: (id: string) => void;
};

function ItemRow({ id, onItemClick, onRowRender }: RowProps) {
  // Test-only observation hook so learners can measure unnecessary renders.
  onRowRender?.(id);
  return <button type="button" onClick={() => onItemClick(id)}>Select {id}</button>;
}

const MemoItemRow = memo(ItemRow);

export function ItemPicker({ onRowRender }: { onRowRender?: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // LAB 02: Function identity changes on EVERY parent render.
  // TODO: Stabilize this callback without capturing stale state.
  const onItemClick = (id: string) => setSelected(id);

  return (
    <section>
      <p>Selected: {selected ?? "none"} | Unrelated counter: {count}</p>
      <button type="button" onClick={() => setCount((n) => n + 1)}>Increment unrelated counter</button>
      <div style={{ display: "flex", gap: 8 }}>
        {ITEMS.map((id) => (
          <MemoItemRow key={id} id={id} onItemClick={onItemClick} onRowRender={onRowRender} />
        ))}
      </div>
    </section>
  );
}
