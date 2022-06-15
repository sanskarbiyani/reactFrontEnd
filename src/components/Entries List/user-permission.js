import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import withStyles from '@mui/styles/withStyles';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import {  useParams } from 'react-router-dom';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import {Container,Paper, Button,Checkbox,ListItemIcon, CardHeader, Grid, List, ListItem,ListItemText } from "@mui/material";
import { Chip } from "@mui/material"; 
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {DisplayDataEntry} from "../Data Table/list-data"
import axios from "axios";
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];
const useStyles = makeStyles((theme) => ({
    card: {
        marginTop:30,
        maxWidth: 500,
        
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
      button:{
            borderRadius:'50',
            color:theme.palette.primary
      },
      media: {
        paddingTop: "56.25%"
      },
      content: {
        textAlign: "left",
        padding: theme.spacing.unit * 3
      },
      divider: {
        margin: `${theme.spacing.unit * 3}px 0`
      },
      heading: {
        fontWeight: "bold"
      },
      subheading: {
        lineHeight: 1.8
      },
      avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
          marginLeft: -theme.spacing.unit
        }
      },
      tranroot: {
        margin: 'auto',
      },
      trancardHeader: {
        padding: theme.spacing(1, 2),
      },
      tranlist: {
        width: 240,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
      },
      tranbutton: {
        margin: theme.spacing(0.5, 0),
      },  

  }));
  
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }

 function Groups({UserPermission,RemainingPermission}) {
    
    
    
    const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(RemainingPermission);
  const [right, setRight] = React.useState(UserPermission);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.tranlist} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

    
    // useEffect( () => {
    //         // onChange({name:'ListName',description:'Create New List!!',disable:true})
    // },[])
    
    // },[setRecords]);
    
    const classes = useStyles()
    if ((!UserPermission || UserPermission.length === 0)||(!RemainingPermission || RemainingPermission.length === 0)) return <p>Can not find any groups, sorry</p>;
  return (
    <div className="App">
        <Container maxWidth="lg">
   
      
      <Paper style={{height: 470, overflow: 'auto', border:1, marginTop:20}}>

          
                <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={classes.tranroot}
            >
            <Grid item>
            
                {customList('Choices', left)}
            
                </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.tranbutton}
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    className={classes.tranbutton}
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                </Grid>
            </Grid>
            <Grid item>
                    
                        {customList('Chosen', right)}
                
            </Grid>
            </Grid>
        </Paper>
</Container>
    </div>
  );
}



export function UserPermission({onChange}){
    const {grp,userID} = useParams()
    function PostLoadingComponent({ isLoading, ...props }) {
        
        const user=[]
        const rem =[]
		if (!isLoading) 
        {
        
            Object.entries(props['groups']['index']['permission']).map((record,index)=>{
                
                    Object.entries(record[1]).map((s)=>{
                        Object.entries(s[1]).map((j)=>{
                           if(index==0){
                                user.push( `${s[0]} | ${j[1]}`)
                           }
                           else{
                                rem.push( `${s[0]} | ${j[1]}`)
                           }
                            
                        })    
                    })
                

            })
            
        return <Groups UserPermission={user} RemainingPermission={rem}  />;}
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


	const [appState, setAppState] = useState({
		loading: true,
		groups: null,
	});

	useEffect(() => {
		axios
            .get('http://127.0.0.1:8000/api/user/permissionOfUserAccGroup/'+grp+'/'+userID)
            .then((res)=>{
			const allGroups = res.data;
			setAppState({ loading: false, groups: allGroups });
			// console.log(res.data);
		});
	}, [setAppState]);
	return (
		<div className="App">
			
			<PostLoadingComponent isLoading={appState.loading} groups={appState.groups} />
		</div>
	);
}
