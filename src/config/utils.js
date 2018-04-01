import pathToRegexp from "path-to-regexp";


export function getCurrentMenu(location,arrayMenu) {
  if(arrayMenu){
    let current = [];
    for (var i = 0; i < arrayMenu.length;i++){
      const e = arrayMenu[i];
      const child = getCurrentMenu(location,e.children);
      if(child && child.length > 0){
        child.push({...e,children:null});
        // child.reverse()
        return child.slice(0, -1);
      }
      if (e.href && pathToRegexp(e.href).exec(location)){
        current.push({...e,children:null})
        return current.reverse();
      }
    }
    return current.reverse();
  }
  return null;
}
