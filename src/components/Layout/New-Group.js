import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Grid,
  Paper,
  Box,
  CardContent,
  Container,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions

} from '@mui/material'
import * as MuiIcons from '@mui/icons-material'
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
  treeItemClasses
} from '@mui/lab/TreeItem';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { Input } from '../ControlFields/TextField';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';
import Typography from '@mui/material/Typography';
import { Delete } from '@mui/icons-material';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field")
  ,
});

export const NewGroupEntry = ({ onChange }) => {
  // const history = useHistory();

  const [treeData, settreeData] = useState([]);
  useEffect(() => {
    console.log(treeData);
  }, [treeData]);

  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
    name: '',

  });

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  function StyledTreeItem(props) {
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const {
      bgColor,
      color,
      labelIcon: LabelIcon,
      labelInfo,
      labelText,
      ...other
    } = props;

    return (
      <StyledTreeItemRoot
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            <Box component={LabelIcon} color={bgColor} sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
              {labelText}
            </Typography>
            {labelInfo === 'yes' ? <Button style={{ color: 'red' }} onClick={handleClickOpen}>
              <Delete fontSize='small' />
            </Button> : ''}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              style={{ padding: 20 }}
            >
              <DialogContent style={{ height: 80, width: 300 }}>
                <DialogContentText id="alert-dialog-description" style={{ fontSize: '25px', textAlign: 'center' }}>
                  Delete Group?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 160 }} onClick={handleClose}>Cancel</Button>
                <Button color="warning" style={{ color: '#00ff00', fontSize: "20px", width: 160 }} onClick={() => {
                  axiosInstance
                    .delete(`allGroups/${labelText}/`)
                    .then((res) => {
                      enqueueSnackbar(`${labelText} Delete Successfully`, {
                        variant: 'error',
                      })
                      fetchData()
                    })
                    .catch(e => {
                      console.log(e)
                    })
                  handleClose()
                }} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': undefined,
        }}
        {...other}
      />
    );
  }

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  const onSubmit = (data) => {

    console.log(JSON.stringify(data, null, 2))
    setValues(data)
    axiosInstance
      .post('allGroups/', {
        name: data.name,
      })
      .then((response) => {
        // alert(response.data);
        enqueueSnackbar('response.data', {
          variant: 'success',
        })
        fetchData()
        // onChange({modelname:data.name,description:data.description,disable:false,color:data.color,icon:data.icon})
      }).catch((e) => {
        enqueueSnackbar("List Already Exists", {
          variant: 'error',
        })
        // history.push('/');
      });
    // localStorage.setItem("fields", null); 
    // localStorage.removeItem("fields");
    // history.push('/data/'+data.name)
  }

  const fetchData = useCallback(async () => {
    axiosInstance
      .get('allGroups')
      .then((res) => {
        settreeData(res.data);
        console.log(res.data);
      }).catch(e => {
        alert("Refresh Page")
      })
  }, []);
  useEffect(() => {

    fetchData()

  }, [])
  const navigate = useNavigate();

  const handleListOpen = (event) => {
    // localStorage
    // navigate(`/display-list-data/`)
    console.log('Calleed.')
    console.log(event.target);
  }
  return (
    <Container maxWidth="xl">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card elevation={1} style={{ justifyContent: 'center' }}>
          <Paper style={{ height: 550, overflow: 'auto', border: 1 }}>
            <CardContent>
              <Grid container >
                <Grid item xs={5} style={{ marginTop: 70 }} >
                  <Grid container rowspacing={2} columnspacing={{ xs: 0, sm: 0, md: 0 }} spacing={2}  >
                    <Grid item xs={12}>
                      <Input
                        {...register('name')}
                        id="name"
                        type="text"
                        label="Group Name"
                        control={control}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                      />
                    </Grid>
                    <Grid item xs={5} >
                      <Paper>
                      </Paper>
                    </Grid>
                    <Grid item xs={7} >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          p: 2
                        }}
                      >
                        <Grid container direction="row-reverse" spacing={2} >
                          {/* <Grid item >
                            <PrimaryButton
                                color="secondary"
                                variant="contained"
                            >
                                Cancel
                            </PrimaryButton>
                        </Grid>    */}
                          <Grid item xs={7}>
                            <PrimaryButton
                              color="primary"
                              variant="contained"
                              type='submit'
                            >
                              Create Group
                            </PrimaryButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider orientation="vertical" style={{ marginLeft: 5, marginRight: 5 }} flexItem />
                <Grid item xs={6} style={{ marginTop: 70 }} >
                  <TreeView
                    aria-label="icon expansion"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 'auto', position: 'relative' }}
                  >
                    {
                      Object.entries(treeData).map((data, index) => {
                        return (
                          <StyledTreeItem nodeId={`${index + 1}`} labelText={data[0]} labelInfo="yes">
                            {
                              Object.entries(data[1]).map((child) => {
                                return (
                                  <StyledTreeItem nodeId={`${(index + 1) * 10}`} labelText={child[1]['list__modelname']} bgColor={child[1]['list__color']} labelIcon={MuiIcons[child[1]['list__icon']]} onClick={ (event) => { handleListOpen(event) }} />
                                )
                              }
                              )
                            }
                          </StyledTreeItem>
                        )
                      })
                    }
                  </TreeView>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Card>
      </Form>
    </Container>
  );
};
