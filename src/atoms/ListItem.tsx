import React from 'react';
import clsx from 'clsx';

import classes from './ListItem.module.css';

interface Props extends React.ComponentPropsWithoutRef<'li'> {
    clickable?: boolean;
    dense?: boolean;
    selected?: string | null;
}

function ListItem({ className, clickable, dense, selected, onClick, ...rest }: Props) {
    const rootClassName = clsx(className, classes.root, {
        [classes.clickable]: clickable,
        [classes.dense]: dense,
        [classes.selected]: selected,
    });

    function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        onClick && onClick(e);

        const { currentTarget: node } = e;

        if (node.classList.contains(classes.selected)) {
            node.classList.remove(classes.selected);
        } else {
            node.classList.add(classes.selected);
        }
    }

    return <li className={rootClassName} onClick={handleClick} {...rest} />;
}

export default ListItem;
