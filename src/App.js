import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./customhooks/use-traverse-tree";
import "./styles.css";
import explorer from "./data/folderData"

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode,deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId) => {
    const updatedTree = deleteNode(explorerData, nodeId);
    setExplorerData({ ...updatedTree });
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} explorer={explorerData} />
    </div>
  );
}

