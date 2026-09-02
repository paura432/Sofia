export type JustifiedPhoto = {
  id: string;
  width: number;
  height: number;
};

export type JustifiedPlaced<T extends JustifiedPhoto> = T & {
  displayWidth: number;
};

export type JustifiedRow<T extends JustifiedPhoto> = {
  photos: JustifiedPlaced<T>[];
  rowHeight: number;
  loose: boolean;
};

const GAP = 8;
const MOBILE_MAX = 600;

export function archiveRowConfig(containerWidth: number): {
  targetRowHeight: number;
  maxItems: number;
  gap: number;
} {
  if (containerWidth < 900) {
    return { targetRowHeight: 195, maxItems: 3, gap: GAP };
  }
  if (containerWidth < 1024) {
    return { targetRowHeight: 205, maxItems: 4, gap: GAP };
  }
  if (containerWidth < 1440) {
    return { targetRowHeight: 220, maxItems: 5, gap: GAP };
  }
  if (containerWidth < 1800) {
    return { targetRowHeight: 250, maxItems: 5, gap: GAP };
  }
  return { targetRowHeight: 280, maxItems: 5, gap: GAP };
}

const SECONDARY_GAP = 12;

export function secondaryRowConfig(containerWidth: number): {
  targetRowHeight: number;
  maxItems: number;
  gap: number;
} {
  if (containerWidth < 900) {
    return { targetRowHeight: 200, maxItems: 3, gap: 10 };
  }
  if (containerWidth < 1024) {
    return { targetRowHeight: 220, maxItems: 3, gap: SECONDARY_GAP };
  }
  if (containerWidth < 1440) {
    return { targetRowHeight: 250, maxItems: 4, gap: SECONDARY_GAP };
  }
  if (containerWidth < 1800) {
    return { targetRowHeight: 280, maxItems: 4, gap: SECONDARY_GAP };
  }
  return { targetRowHeight: 300, maxItems: 4, gap: SECONDARY_GAP };
}

export function isArchiveMobile(containerWidth: number): boolean {
  return containerWidth < MOBILE_MAX;
}

export function buildJustifiedRows(
  photos: readonly JustifiedPhoto[],
  availableWidth: number,
  targetRowHeight: number,
  gap: number,
  maxItems = 5,
): JustifiedRow<JustifiedPhoto>[] {
  if (availableWidth <= 0 || photos.length === 0) return [];

  const rows: JustifiedRow<JustifiedPhoto>[] = [];
  let row: JustifiedPhoto[] = [];
  let aspectSum = 0;

  const emit = (items: JustifiedPhoto[], loose: boolean) => {
    const n = items.length;
    const gaps = gap * Math.max(0, n - 1);
    let aspect = 0;
    for (const item of items) aspect += item.width / item.height;
    let rowHeight = (availableWidth - gaps) / aspect;
    if (loose && rowHeight > targetRowHeight) {
      rowHeight = targetRowHeight;
    }
    rows.push({
      loose,
      rowHeight,
      photos: items.map((item) => ({
        ...item,
        displayWidth: (item.width / item.height) * rowHeight,
      })),
    });
  };

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    row.push(photo);
    aspectSum += photo.width / photo.height;
    const last = i === photos.length - 1;
    const height =
      (availableWidth - gap * (row.length - 1)) / aspectSum;
    const full =
      !last && (height <= targetRowHeight || row.length >= maxItems);
    if (full) {
      emit(row, false);
      row = [];
      aspectSum = 0;
    } else if (last) {
      emit(row, height > targetRowHeight);
    }
  }

  return rows;
}

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

{
  const photos = [
    { id: "a", width: 2, height: 3 },
    { id: "b", width: 3, height: 2 },
    { id: "c", width: 2, height: 3 },
    { id: "d", width: 3, height: 2 },
  ];
  const rows = buildJustifiedRows(photos, 1000, 200, 8, 5);
  assert(rows.length >= 1, "rows");
  assert(
    rows.every((row) =>
      row.photos.every(
        (p) => Math.abs(p.displayWidth / row.rowHeight - p.width / p.height) < 0.001,
      ),
    ),
    "aspect",
  );
  const last = buildJustifiedRows(
    [{ id: "x", width: 3, height: 2 }],
    1000,
    200,
    8,
    5,
  );
  assert(last[0].loose, "last loose");
  assert(last[0].rowHeight === 200, "last not stretched");
  const secondary = secondaryRowConfig(1920);
  assert(secondary.maxItems === 4, "secondary max");
  assert(secondary.targetRowHeight >= 260, "secondary height");
  const packed = buildJustifiedRows(
    Array.from({ length: 15 }, (_, i) => ({
      id: String(i),
      width: i % 2 === 0 ? 2 : 3,
      height: i % 2 === 0 ? 3 : 2,
    })),
    1600,
    secondary.targetRowHeight,
    secondary.gap,
    secondary.maxItems,
  );
  assert(
    packed.every((row) => row.photos.length <= 4),
    "secondary cap",
  );
}
