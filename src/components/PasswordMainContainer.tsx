import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';

import AppHeader from './AppHeader';
import Passwords from './Passwords';
import NoPasswordSelected from './NoPasswordSelected';
import NoPasswords from './NoPasswords';
import PasswordView from './PasswordView';
import PasswordEdit from './PasswordEdit';

import { Password } from '../models';
import classes from './PasswordMainContainer.module.css';
import { getItem } from '../storage';

function createNewPassword() {
    const id = uniqid();

    return {
        id,
        value: '',
    } as Password;
}

interface Props {
    decryptedPasswords: { [key: string]: Password };
    onLogout: () => void;
    onPasswordCreated: (password: Password) => void;
    onPasswordEdited: (password: Password) => void;
    onPasswordDeleted: (id: string) => void;
}

const PasswordMain = ({
    decryptedPasswords,
    onLogout,
    onPasswordCreated,
    onPasswordEdited,
    onPasswordDeleted,
}: Props) => {
    const [selectedPasswordId, setSelectedPasswordId] = useState<string | null>(null);
    const [editing, setEditing] = useState(false);
    const [storedPasswords, setStoredPasswords] = useState<any>();

    useEffect(() => {
        const passwordList = getItem('passwords');
        if (passwordList) {
            setStoredPasswords(passwordList);
        }
    }, []);

    function handleCreatePassword() {
        const newPassword = createNewPassword();
        onPasswordCreated(newPassword);
        setSelectedPasswordId(newPassword.id);
        setEditing(true);
    }

    function handleSelectPassword(id: string) {
        setSelectedPasswordId(id);
    }

    function handleDelete(id: string) {
        onPasswordDeleted(id);
        setEditing(false);
        setSelectedPasswordId(null);
    }

    function handleCancel() {
        setEditing(false);
    }

    function handlePasswordEditIntent() {
        setEditing(true);
    }

    function handleSave(password: Password) {
        onPasswordEdited(password);
        setEditing(false);
    }

    const passwords = { ...storedPasswords, ...decryptedPasswords };
    const amountOfVulnerablePasswords = Object.keys(passwords).reduce<number>(
        (acc, key) => acc + +(passwords[key].value.length < 3),
        0
    );

    return (
        <div className={classes.container}>
            <div className={classes.headerArea}>
                <AppHeader
                    editing={editing}
                    amountOfVulnerablePasswords={amountOfVulnerablePasswords}
                    onNewPassword={handleCreatePassword}
                    onLogout={onLogout}
                />
            </div>

            <div className={classes.passwordsArea}>
                {Object.values(passwords).length > 0 ? (
                    <Passwords
                        passwords={passwords}
                        editing={editing}
                        onSelectPassword={handleSelectPassword}
                        selected={selectedPasswordId}
                    />
                ) : (
                    <NoPasswords />
                )}
            </div>

            <div className={classes.passwordArea}>
                {selectedPasswordId !== null ? (
                    editing ? (
                        <PasswordEdit
                            key={selectedPasswordId}
                            passwords={passwords}
                            password={passwords[selectedPasswordId]}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onDelete={() => handleDelete(selectedPasswordId)}
                        />
                    ) : (
                        <PasswordView
                            key={selectedPasswordId}
                            password={passwords[selectedPasswordId]}
                            onEdit={handlePasswordEditIntent}
                        />
                    )
                ) : (
                    <NoPasswordSelected />
                )}
            </div>
        </div>
    );
};

export default PasswordMain;
