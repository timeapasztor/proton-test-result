import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { Password } from '../models';
import List from '../atoms/List';
import PasswordListItem from './PasswordListItem';
import classes from './Passwords.module.css';
import { getItem, setItem } from '../storage';

interface Props {
    editing: boolean;
    passwords: { [key: string]: Password };
    onSelectPassword: (id: string) => void;
    selected: string | null;
}

function Passwords({ editing, passwords, onSelectPassword, selected }: Props) {
    const [passwordList, setPasswordList] = useState<any>();
    useEffect(() => {
        const passwordList = localStorage.getItem('passwords');
        if (passwordList) {
            setPasswordList(passwordList);
        }
    }, []);

    useEffect(() => {
        setItem('passwords', passwords);
        setPasswordList(getItem('passwords'));
    }, [passwords]);

    function renderListItem(password: Password, index: number) {
        function handleClick() {
            onSelectPassword(password.id);
        }
        return (
            <PasswordListItem
                selected={password.id === selected ? selected : null}
                key={`${password.name}-${password.id}-${index}`}
                name={password.name || ''}
                disabled={editing}
                onClick={handleClick}
                vulnerable={password.value.length < 2}
            />
        );
    }

    return (
        <List className={clsx(classes.passwords, { [classes.disabled]: editing })}>
            {passwordList && Object.values(passwordList).map((item: any, index: number) => renderListItem(item, index))}
        </List>
    );
}

export default Passwords;
