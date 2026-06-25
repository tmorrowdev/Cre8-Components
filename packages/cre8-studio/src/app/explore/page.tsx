import ExploreCanvasView from "@/components/explore-canvas-view";

export default function ExplorePage() {
  return (
    <div className="page page--full">
      <ExploreCanvasView dataset="ecommerce" />
    </div>
  );
}
