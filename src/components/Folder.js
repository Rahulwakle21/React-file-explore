import { useState } from "react";

function Folder({ handleInsertNode , handleDeleteNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  const onDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };


  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button onClick={onDelete}>Delte</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
           <span>{showInput.isFolder? "📁" : "📄"}</span> 
           <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
             

              </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <>
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                key={exp.id}
                explorer={exp}
                />
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return  (
      <div className="file" style={{display:"inline", justifyContent: "space-between",width:"5%"}}>
        <span>📄 {explorer.name}</span>
        <button onClick={onDelete} style={{ color: "red", marginLeft: "15px" }}>Delete</button>
      </div>
    );
  }
}

export default Folder;
