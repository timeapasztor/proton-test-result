import React from 'react';
import Icon from '../atoms/Icon';

import ListItem from '../atoms/ListItem';
import classes from './PasswordListItem.module.css';

interface PasswordListItemProps {
    name: string;
    disabled: boolean;
    onClick: () => void;
    vulnerable: boolean;
    selected: string | null;
}

function PasswordListItem({ name, vulnerable, selected, ...rest }: PasswordListItemProps) {
    return (
        <ListItem clickable className={classes.listItem} selected={selected} {...rest}>
            {name}
            {vulnerable && <Icon size="small" className="fas fa-exclamation-triangle" />}
        </ListItem>
    );
}

export default React.memo(PasswordListItem);
