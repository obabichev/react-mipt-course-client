import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDictionaries} from '../../reducers/dictionaries';
import {RootState} from '../../reducers';
import {Board} from '../../types';
import {createBoard} from '../../reducers/boards';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {ProgressWrapper} from '../common/ProgressWrapper';
import {useLoading} from '../../hooks/useLoading';
import {CREATE_BOARD_LOADING} from '../../reducers/loading';
import {useDispatchThunk} from '../../hooks/useDispatchThunk';
import {first} from 'lodash';


export const CreateBoardModal = () => {
    const [board, setBoard] = useState<Partial<Board>>({
        title: '',
        key: '',
    });
    const [validation, setValidation] = useState<{ [key in string]: { messages: string[] } }>({});

    const isLoading = useLoading([CREATE_BOARD_LOADING]);

    const categories = useSelector((state: RootState) => state.dictionaries.categories);
    const boardIcons = useSelector((state: RootState) => state.dictionaries['board-icons']);

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

    const onChangeIcon = ({target: {value}}: ChangeEvent<{ value: unknown; }>) => updateField(
        'icon',
        boardIcons.find(icon => icon.key === value)
    );

    const dispatch = useDispatchThunk();

    useEffect(() => {
        dispatch(fetchDictionaries('categories'));
        dispatch(fetchDictionaries('board-icons'));
    }, [dispatch]);

    useEffect(() => {
        if (!board.category && categories.length > 0) {
            updateField('category', categories[0]);
        }
    }, [categories, board.category, updateField]);

    useEffect(() => {
        if (!board.icon && boardIcons.length > 0) {
            updateField('icon', boardIcons[0]);
        }
    }, [boardIcons, board.icon, updateField]);

    const errorMessage = (key: string) => {
        return first(validation[key]?.messages) || '';
    };

    const onCreateBoard = () => {
        dispatch(createBoard(board))
            .catch(err => {
                setValidation(err.validation);
            })
    };

    return <ProgressWrapper loading={isLoading}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <Typography variant="h5">Create Board</Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
                <FormControl>
                    <InputLabel id="demo-customized-select-label">Icon</InputLabel>
                    <Select
                        value={board?.icon?.key || ''}
                        onChange={onChangeIcon}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {boardIcons.map(icon => (
                            <MenuItem key={icon.key} value={icon.key}>
                                <img alt="icon" src={icon.value} width={20} height={20}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={11} sm={5}>
                <TextField
                    onChange={onChange}
                    value={board.title}
                    name="title"
                    required
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errorMessage('title')}
                    helperText={errorMessage('title')}
                />
            </Grid>
            <Grid item xs={11} sm={5}>
                <TextField
                    onChange={onChange}
                    value={board.key?.toUpperCase()}
                    name="key"
                    required
                    label="Key"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    error={!!errorMessage('key')}
                    helperText={errorMessage('key')}
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
    </ProgressWrapper>;
};
