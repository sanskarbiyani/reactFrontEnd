import React , { useEffect, useState, useCallback} from 'react';
import { Container
    , Card, CardHeader,Paper, CardContent
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Header from '../Header';
import { NewEntryFinal } from './skeleton-Entry';

import { useParams } from 'react-router';
import axiosInstance from '../../axois';
const baseURL = "deleteField/";

export function UpdateEntry({onChange}){
    const { list,id } = useParams();
      const [appState, setAppState] = useState({
          loading: true,
          cols: null,
          data:null,
          id : id,
          listHistory : null
      });

      const PostLoadingComponent = ({ isLoading, ...props })=> {
          
          if (!appState.loading) 
          {
            console.log(id)
              
          return ( <><Header listname={props.listHistory} select = 'list' isList={true} /> <NewEntryFinal data={props.cols} fieldData={props.data} onChange={onChange} list11={null} record_id={id} fetch={props.fetch} /></>)
          ;}
          return (
              <Container maxWidth="lg">
              
               <Card elevation={0}>
                 <CardHeader
                 title={
                     "Groups Loading"
                 }
                 />
                 <Paper style={{height: 470, overflow: 'auto', border:1}}>
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
  
      const fetchData = useCallback(async () => {
        axiosInstance
        .get(baseURL.concat(list+'/'))
        .then((res)=>{
          const allCols = res.data;
          axiosInstance.get(`models/single/${list}/xyz/${id}/`)
          .then((res)=>{
            const values = res.data;
            console.log(values)
            axiosInstance
                      .get(`allLists/${list}/`)
                      .then((ress)=>{
                      // setAppState({listHistory:[res.data],})
                      localStorage.removeItem("listname");                    
                      localStorage.setItem("listname", JSON.stringify(ress.data));
                      // setListHistory(listHistory,()=>props.onChangeName(listHistory))                    
                      // props.onChangeName()
                      // console.log(listHistory['modelname'])
                      // console.log(props)
                      console.log(values)
                      setAppState({loading: false,listHistory:[ress.data], cols: allCols, data :values });
                  })
                  .catch(e=>{
                  console.log(e)
                  })
            
          }).catch(e=>{
            alert(e)
          })

          
          
        })
        .catch(e=>{
            console.log(e)
            
        });
    
    
    }, [setAppState]);
  
      useEffect(() => {
      
        fetchData()
    
      
      }, [setAppState]);
      return (
          <div className="App">
              
              <PostLoadingComponent isLoading={appState.loading} cols={appState.cols} data={appState.data} id={appState.id} listHistory ={appState.listHistory} fetch={fetchData}/>
          </div>
      );
  }