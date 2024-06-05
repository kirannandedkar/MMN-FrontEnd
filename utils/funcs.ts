const isOlder18 = (birth: string | undefined) => {
    if (!birth)
        return false;
    return ((Date.now() - Date.parse(birth)) / 1000) > (18 * 365 * 24 * 60 * 60);
}

export { isOlder18 }