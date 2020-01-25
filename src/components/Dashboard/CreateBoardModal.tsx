import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {createStyles, Modal, Theme, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDictionaries} from '../../reducers/dictionaries';
import {RootState} from '../../reducers';
import {Board} from '../../types';
import {createBoard} from '../../reducers/board';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            width: '400px',
            outline: 'none'
        },
        input: {
            fontSize: '14px'
        },
    }),
);

interface CreateBoardModalProps {
    open: boolean
    onClose: () => void
}

export const CreateBoardModal: React.FunctionComponent<CreateBoardModalProps> = ({open, onClose}) => {
    const classes = useStyles();

    const [board, setBoard] = useState<Partial<Board>>({
        title: '',
        key: '',
    });

    const categories = useSelector((state: RootState) => state.dictionaries.categories);

    const updateField = useCallback((name: string, value: any) => {
        setBoard({
            ...board,
            [name]: (name === 'key') ? value.toUpperCase() : value
        });
    }, [setBoard, board]);

    const onChange = ({target: {name, value}}: ChangeEvent<{ name: string, value: unknown }>) => updateField(name, value);

    const onChangeCategory = ({target: {value}}: ChangeEvent<{ value: unknown; }>) => updateField(
        'category',
        categories.find(category => category.key === value)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDictionaries('categories'));
    }, [dispatch]);

    useEffect(() => {
        if (!board.category && categories.length > 0) {
            updateField('category', categories[0]);
        }
    }, [categories, board.category, updateField]);

    const onCreateBoard = () => {
        dispatch(createBoard(board));
    };

    return <Modal open={open} onClose={onClose} className={classes.modal}>
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Create Board</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        onChange={onChange}
                        value={board.title}
                        name="title"
                        required
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        className={classes.input}
                        onChange={onChange}
                        value={board.key?.toUpperCase()}
                        name="key"
                        required
                        label="Key"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        value={board?.category?.key || ''}
                        onChange={onChangeCategory}
                        fullWidth
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.key} value={category.key}>
                                {category.value}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={9}>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained"
                            color="primary"
                            onClick={onCreateBoard}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Modal>;
};
