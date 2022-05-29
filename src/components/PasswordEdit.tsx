import React, { useEffect, useState } from 'react';

import Icon from '../atoms/Icon';
import LabelledIconButton from './LabelledIconButton';
import classes from './PasswordEdit.module.css';
import reusableClasses from './reusable.module.css';
import Labelled from '../atoms/Labelled';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import List from '../atoms/List';
import ListItem from '../atoms/ListItem';
import clsx from 'clsx';
import TextArea from '../atoms/TextArea';
import { Password } from '../models';

interface PasswordEditProps {
    password: Password;
    passwords: Password[];
    onSave: (item: Password) => void;
    onDelete: () => void;
    onCancel: () => void;
}

interface UrlListProps {
    urls: string[];
    onDelete: (index: number) => void;
}

const UrlList = React.memo(({ urls, onDelete }: UrlListProps) => (
    <List className={classes.urlList}>
        {urls &&
            urls.map((urlEntry: string, index: number) => (
                <ListItem dense className={classes.urlListItem}>
                    <input readOnly autoFocus value={urlEntry} />
                    <Icon onClick={() => onDelete(index)} size="small" className="fas fa-times" />
                </ListItem>
            ))}
        {urls?.length === 0 && (
            <ListItem dense className={clsx(classes.urlListItem, classes.urlListItemEmpty)}>
                No urls added
            </ListItem>
        )}
    </List>
));

function PasswordEdit({ password, passwords, onSave, onDelete, onCancel }: PasswordEditProps) {
    const [urls, setUrls] = useState<string[]>([]);
    const [values, setValues] = useState(password);
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        if (values && values.url) {
            setUrls(values.url);
        }
    }, [values]);

    function change(partial: {}) {
        setValues((values) => ({
            ...values,
            ...partial,
        }));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        change({ [e.target.name]: e.target.value });
    }

    function handleSaveClick() {
        onSave({
            ...password,
            ...values,
        });
    }

    function handleDeleteClick() {
        onDelete();
    }

    function handleCancelClick() {
        onCancel();
    }

    function checkUrlInputInPasswords(urlInput: string) {
        let matchPassword: Password = {
            id: '',
            value: '',
        };
        if (Object.values(passwords) && Object.values(passwords).length > 0) {
            Object.values(passwords).forEach((password) => {
                if (password && password.url && password.url.length > 0) {
                    password.url.forEach((item) => {
                        if (item === urlInput) {
                            matchPassword = password;
                        }
                    });
                }
            });
        }
        return matchPassword;
    }

    function handleUrlAdd() {
        const pwdMatch = checkUrlInputInPasswords(urlInput);
        if (pwdMatch && pwdMatch.name) {
            return alert(`This URL has already been added to ${pwdMatch.name} password.`);
        }

        let list = [...urls];
        list.unshift(urlInput);
        setUrls(list);

        change({ url: list });

        setUrlInput('');
    }

    const handleUrlDelete = (index: number) => {
        let urlList = [...urls];
        urlList.splice(index, 1);

        change({ url: urlList });
    };

    return (
        <div className={reusableClasses.container}>
            <h2 className={reusableClasses.title}>
                <input
                    autoFocus
                    className={classes.titleInput}
                    name="name"
                    value={values ? values.name : ''}
                    onChange={handleChange}
                />
            </h2>
            <div className={reusableClasses.content}>
                <Labelled label="description">
                    <TextArea name="description" value={values ? values.description : ''} onChange={handleChange} />
                </Labelled>

                <Labelled label="value">
                    <Input name="value" value={values ? values.value : ''} onChange={handleChange} />
                </Labelled>

                <Labelled label="url">
                    <div>
                        <Input
                            value={urlInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
                            style={{ marginRight: 4 }}
                        />

                        <Button onClick={handleUrlAdd}>Add</Button>
                    </div>

                    <UrlList urls={urls} onDelete={handleUrlDelete} />
                </Labelled>
            </div>
            <div className={reusableClasses.controls}>
                <LabelledIconButton
                    label="Cancel"
                    className={classes.cancel}
                    onClick={handleCancelClick}
                    icon={<Icon size="small" className="fas fa-times" />}
                />

                <LabelledIconButton
                    label="Save"
                    onClick={handleSaveClick}
                    icon={<Icon size="small" className="fas fa-save" />}
                />

                <LabelledIconButton
                    label="Delete"
                    className={classes.delete}
                    onClick={handleDeleteClick}
                    icon={<Icon size="small" className="fas fa-trash" />}
                />
            </div>
        </div>
    );
}

export default PasswordEdit;
