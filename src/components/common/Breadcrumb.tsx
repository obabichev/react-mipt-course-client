import React from 'react';
import {flatMap, compact} from 'lodash';
import {useHistory} from 'react-router';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    link: {
        color: 'rgb(107, 119, 140)',
        cursor: 'pointer',
        "&:hover": {
            textDecoration: 'underline',
            color: 'rgb(137, 147, 164)'
        }
    },
    delimiter: {
        color: 'rgb(107, 119, 140)',
        marginLeft: '6px',
        marginRight: '6px'
    }
});

export const Breadcrumb: React.FunctionComponent<{ paths: { title: string, path: string }[] }> = ({paths}) => {
    const classes = useStyles();
    const history = useHistory();

    const onClickLink = (path: string) => (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        history.push(path);
    };

    return <div>
        {compact(flatMap(paths, (path, index) => [
            (index !== 0 ? <span className={classes.delimiter} key={`delimiter#${index}`}>/</span> : null),
            <a key={index} onClick={onClickLink(path.path)} className={classes.link}>
                {path.title}
            </a>
        ]))}
    </div>;

};