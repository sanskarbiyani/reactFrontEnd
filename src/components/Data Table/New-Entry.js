import React, { useEffect, useState } from 'react';
import {
  Container, Chip
  , Card, CardHeader, Paper, CardContent
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axioxInstance from '../../axois'
import { NewEntryFinal } from './skeleton-Entry';
import { useParams } from 'react-router';
import Header from '../Header';
import { useSelector, useDispatch } from 'react-redux';
const baseURL = "deleteField/";


export function NewEntry({ onChange }) {
  const { list, group } = useParams();
  const listname = useSelector((state) => state.customization.group_list);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listHistory, setListHistry } = useState([JSON.parse(localStorage.getItem('listname'))])
  const [appState, setAppState] = useState({
    loading: true,
    cols: null,
    data: null,
    listHistory: null
  });

  const PostLoadingComponent = ({ isLoading, ...props }) => {

    if (!appState.loading) {
      return (
        <>
          <Header listname={props.listHistory} group={listname['group']} select='log' isList={true} />
          <NewEntryFinal data={props.cols} fieldData={props.data} onChange={onChange} />
        </>);
    }
    return (
      <Container maxWidth="lg">

        <Card elevation={0}>
          <CardHeader
            title={
              "Groups Loading"
            }
          />
          <Paper style={{ height: 470, overflow: 'auto', border: 1 }}>
            <CardContent>
            </CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />

          </Paper>
        </Card>

      </Container>


    );
  };



  useEffect(() => {
    axioxInstance
      .get(baseURL.concat(listname['list'] + '/'))
      .then((res) => {
        const allCols = res.data;
        axioxInstance
          .get(`allLists/${listname['list']}/`)
          .then((ress) => {
            // setAppState({listHistory:[res.data],})
            localStorage.removeItem("listname");
            localStorage.setItem("listname", JSON.stringify(ress.data));
            // setListHistory(listHistory,()=>props.onChangeName(listHistory))                    
            // props.onChangeName()
            // console.log(listHistory['modelname'])
            // console.log(props)
            setAppState({ loading: false, cols: allCols, data: null, listHistory: [ress.data] });

          })
          .catch(e => {
            console.log(e)
          })

      })
      .catch(e => {
        console.log(e)

      });


  }, [setAppState]);
  return (
    <div className="App">

      <PostLoadingComponent isLoading={appState.loading} cols={appState.cols} data={appState.data} listHistory={appState.listHistory} />
    </div>
  );
}
{/* 
(acceptedFiles,e) => {
                                console.log( e.target.files)
                                // do nothing if no files
                                if (acceptedFiles.length === 0) { return; }
                  
                                // on drop we add to the existing files
                                
                                props.setFieldValue(item.name, props.values[item.name].concat(acceptedFiles));
                                setDropzoneOpen(false);                                
                              }}
                            
                            const imageObject = {};

for (const key in fileObject) {
    const value = fileObject[key];
    const notFunction = typeof value !== "function";
    notFunction && (imageObject[key] = value);
}

console.log(imageObject) 
---
function stringify(obj) {
    const replacer = [];
    for (const key in obj) {
        replacer.push(key);
    }
    return JSON.stringify(obj, replacer);
}

const json = stringify(file);
console.log(file);
console.log(json);
                            
                            */}

