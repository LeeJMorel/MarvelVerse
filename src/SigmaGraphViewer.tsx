import { FC, useEffect, useState } from "react";
import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  ZoomControl,
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
  useSigma,
} from "@react-sigma/core";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineFullscreenExit,
  AiOutlineFullscreen,
} from "react-icons/ai";
import { MdFilterCenterFocus } from "react-icons/md";
import { MultiDirectedGraph } from "graphology";
import "./App.scss";
import { Attributes } from "graphology-types";
import { GraphData } from "./types";

interface SigmaGraphViewerProps {
  data: GraphData;
  onNodeClick: (label: string) => void;
}

function customDrawLabel(context, data, settings) {
  const fontSize = settings.labelSize || 12;
  context.font = `${fontSize}px Lato, sans-serif`;

  if (data.highlighted === false) {
    context.fillStyle = "rgba(0, 0, 0, 0.75)";
    const padding = 4;
    const textWidth = context.measureText(data.label).width;
    const backgroundWidth = textWidth + padding * 2;
    const backgroundHeight = fontSize + padding * 2;
    context.fillRect(
      data.x - backgroundWidth / 2,
      data.y - fontSize / 2 - padding,
      backgroundWidth,
      backgroundHeight
    );

    // Label text
    context.fillStyle = "white"; // White text color
    context.fillText(data.label, data.x - textWidth / 2, data.y + fontSize / 2);
  }
}

const MyGraph: FC<SigmaGraphViewerProps> = ({ data, onNodeClick }) => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Create the graph
    const graph = new MultiDirectedGraph();

    data.nodes.forEach((node) => {
      graph.addNode(node.id, { ...node });
    });

    data.edges.forEach((edge) => {
      graph.addEdgeWithKey(edge.id, edge.source, edge.target, {
        color: edge.color,
      });
    });

    loadGraph(graph);

    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
      clickNode: (event) => {
        const clickedNode = sigma
          .getGraph()
          .getNodeAttributes(event.node).label;
        onNodeClick(clickedNode);
      },
    });
  }, [data, loadGraph, registerEvents, onNodeClick, sigma]);

  useEffect(() => {
    setSettings({
      labelRenderer: customDrawLabel,
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData: Attributes = {
          ...data,
          highlighted: data.highlighted || false,
        };

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);

  return null;
};

export const SigmaGraphViewer: FC<SigmaGraphViewerProps> = ({
  data,
  onNodeClick,
}) => {
  return (
    <SigmaContainer
      graph={MultiDirectedGraph}
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        overflow: "hidden",
        background: "transparent",
      }}
      settings={{
        labelFont: "Lato, sans-serif",
        zIndex: true,
        defaultEdgeType: "arrow",
      }}
    >
      <ControlsContainer position="top-left">
        <ZoomControl>
          <AiOutlineZoomIn color="black" />
          <AiOutlineZoomOut color="black" />
          <MdFilterCenterFocus color="black" />
        </ZoomControl>
        <FullScreenControl>
          <AiOutlineFullscreen color="black" />
          <AiOutlineFullscreenExit color="black" />
        </FullScreenControl>
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
      </ControlsContainer>
      <MyGraph data={data} onNodeClick={onNodeClick} />
    </SigmaContainer>
  );
};
