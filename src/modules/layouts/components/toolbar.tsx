import { LayoutFilter } from "./layout-filter";

export const Toolbar = () => {
  return (
    <section className="min-h-10 px-24 sticky left-0 shrink-0">
      <div className="flex justify-between items-center h-10 shadow-[0_1px_0_rgb(233,233,231)] w-full">
        <div className="flex items-center h-full grow-0" />
        <div className="flex items-center justify-end gap-px">
          <LayoutFilter />
        </div>
      </div>
    </section>
  );
}