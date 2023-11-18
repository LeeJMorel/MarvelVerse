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
}

const MyGraph: FC<{ data: GraphData }> = ({ data }) => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Create the graph
    const graph = new MultiDirectedGraph();

    data.nodes.forEach((node, index) => {
      graph.addNode(String(index), { ...node });
    });

    data.edges.forEach((edge, index) => {
      graph.addEdgeWithKey(String(index), edge.source, edge.target, {
        color: edge.color,
      });
    });

    loadGraph(graph);

    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, [data, loadGraph, registerEvents]);

  useEffect(() => {
    setSettings({
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

export const SigmaGraphViewer: FC<SigmaGraphViewerProps> = ({ data }) => {
  return (
    <SigmaContainer
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
      <MyGraph data={data} />
    </SigmaContainer>
  );
};
