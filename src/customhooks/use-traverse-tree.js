const useTraverseTree = () => {
  
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id:new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree , nodeId) => {
    if(!tree) return null;
      tree.items = tree.items.filter((item)=> item.id !== nodeId)

      tree.items = tree.items.map((item)=>{
         return deleteNode(item,nodeId)
      })
      return tree
  };

 

  return { insertNode, deleteNode };
};

export default useTraverseTree;