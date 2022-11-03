import { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";


interface PlaygroundContextType {
  folders: any;
  setFolders: any;
  createNewFolder: (folderTitle: string) => void;
  createNewPlayground: (
    folderId: string,
    cardTitle: string,
    cardLanguage: string
  ) => void;
  createNewFolderAndPlayground: (
    folderTitle: string,
    cardTitle: string,
    cardLanguage: string
  ) => void;
  editCardTitle: (
    folderId: string,
    cardId: string,
    newCardTitle: string
  ) => void;
  editFolderTitle: (folderId: string, newFolderTitle: string) => void;
  deleteCard: (folderId: string, cardId: string) => void;
  deleteFolder: (folderId: string) => void;
  saveCodePlayground : ( folderId :string, cardId :string , newCode :string, newLang:string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

export interface FolderT {
  title: string;
  items: {
    [key: string]: {
      title: string;
      language: string;
    };
  };
}
export interface FolderType {
  [key: string]: FolderT;
}



export const langMap: {
  [key: string]: {
    id:number;
    defaultCode: string;
  };
} = {
  "c++": {
    id: 54,
    defaultCode:
      "#include <iostream>\n" +
      "using namespace std;\n" +
      "int main() {\n" +
      '      cout<<"Hello World!";\n' +
      "\n" +
      "}",
  }
  , "java": {
    id: 62,
    defaultCode:
    "public class Main {\n" +
    " public static void main(String args[]) {\n" +
   '                         System.out.println("Hello World!"); \n' +
    " } \n" +
    "}",
},
  "python": {
    id: 71,
    defaultCode:
    'print("Hello World!") {\n' +
    '#Python here',
}
  , "javascript": {
    id: 63,
    defaultCode:

    "/* \n" +
    "Use INPUT variable to get stdin.\n" +
   '     Try console.log(INPUT);\n' +
    "*/ \n" +
    " console.log('Hello World');",
},
}
const initialItems = {
  [uuid()]: {
    title: "Folder Title1",
    items: {
      [uuid()]: {
        title: "Stack Implementstation",
        language: "c++",
        code: langMap["c++"].defaultCode,
      },
      // [uuid()]: {
      //   title: "Array Implementstation",
      //   language: "C++",
      // },
      // [uuid()]: {
      //   title: "HASh Implementstation",
      //   language: "C++",
      // },
    }

  },
}
export default function PlaygroundProvider({ children }: { children: any }) {
  const [folders, setFolders] = useState(() => {
    let localData = JSON.parse(localStorage.getItem("playgroundData") as string);

    localData = localData === undefined || localData === null || Object.keys(localData).length === 0 ? null : localData;

    return localData || initialItems
  })

  // local storage
  useEffect(() => {
    localStorage.setItem("playgroundData", JSON.stringify(folders));

  }, [folders])



  // new folder
  const createNewFolder = (folderTitle: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };

      newState[uuid()] = {
        title: folderTitle,
        items: {},
      };
      return newState;

    })
  }

  // new playground
  const createNewPlayground = (folderId: string, cardTitle: string, cardLanguage: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      //  new playground
      newState[folderId].items[uuid()] = {
        title: cardTitle,
        language: cardLanguage,
        code: langMap[cardLanguage].defaultCode,
      };
      return newState;
    });
  };

  // newfolder and playground

  const createNewFolderAndPlayground = (folderTitle: string,
    cardTitle: string,
    cardLanguage: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      newState[uuid()] = {
        title: folderTitle,
        items: {
          [uuid()]: {
            title: cardTitle,
            language: cardLanguage,
            code: langMap[cardLanguage].defaultCode,

          },
        },
      };
      return newState;

    });
  }

  //    edit cardTitle

  const editCardTitle = (
    folderId: string,
    cardId: string,
    newCardTitle: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // update title
      newState[folderId].items[cardId].title = newCardTitle;
      return newState;
    });
  };

  // edit folderTitle

  const editFolderTitle = (folderId: string, newFolderTitle: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      newState[folderId].title = newFolderTitle;
      return newState;
    });
  };


  //  delete card
  const deleteCard = (folderId: string, cardId: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      delete newState[folderId].items[cardId];
      return newState;
    });
  };

  // delete folder
  const deleteFolder = (folderId: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      delete newState[folderId];
      return newState;
    });
  };

  const saveCodePlayground = ( folderId :string, cardId :string , newCode :string, newLang:string) =>{
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      newState[folderId].items[cardId].code = newCode;
      newState[folderId].items[cardId].language = newLang;
      return newState;
    });
  }



  const makeAvailableGlobally: PlaygroundContextType = {
    folders: folders,
    setFolders: setFolders,
    createNewFolder: createNewFolder,
    createNewPlayground: createNewPlayground,
    createNewFolderAndPlayground: createNewFolderAndPlayground,
    editCardTitle: editCardTitle,
    editFolderTitle: editFolderTitle,
    deleteCard: deleteCard,
    deleteFolder: deleteFolder,
    saveCodePlayground:saveCodePlayground,
  };

  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}