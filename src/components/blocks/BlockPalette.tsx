import { blockPresetList } from '../../project/blockPresets';
import type { HifiBlockType } from '../../project/blockPresets';
import { useProjectStore } from '../../store/projectStore';

export function BlockPalette() {
  const addBlock = useProjectStore((state) => state.addBlock);

  const handleAddBlock = (blockType: HifiBlockType) => {
    addBlock(blockType);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {blockPresetList.map((preset) => (
        <button
          key={preset.type}
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-left text-sm font-medium text-slate-200 transition hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          onClick={() => handleAddBlock(preset.type)}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
