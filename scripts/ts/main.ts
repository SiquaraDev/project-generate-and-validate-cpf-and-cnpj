const BTN_CPF_GENERATOR = document.getElementById("btn-cpf-generator") as HTMLButtonElement;
const INPUT_CPF_GENERATOR = document.getElementById("cpf-generator") as HTMLInputElement;
const BTN_CPF_VALIDATOR = document.getElementById("btn-cpf-validator") as HTMLButtonElement;
const INPUT_CPF_VALIDATOR = document.getElementById("cpf-validator") as HTMLInputElement;
const TEXT_CPF = document.getElementById("cpf-result") as HTMLParagraphElement;
const BTN_CLEAR_CPF_VALIDATOR = document.getElementById("btn-clear-cpf-validator") as HTMLButtonElement;

const BTN_CNPJ_GENERATOR = document.getElementById("btn-cnpj-generator") as HTMLButtonElement;
const INPUT_CNPJ_GENERATOR = document.getElementById("cnpj-generator") as HTMLInputElement;
const BTN_CNPJ_VALIDATOR = document.getElementById("btn-cnpj-validator") as HTMLButtonElement;
const INPUT_CNPJ_VALIDATOR = document.getElementById("cnpj-validator") as HTMLInputElement;
const TEXT_CNPJ = document.getElementById("cnpj-result") as HTMLParagraphElement;
const BTN_CLEAR_CNPJ_VALIDATOR = document.getElementById("btn-clear-cnpj-validator") as HTMLButtonElement;

BTN_CPF_GENERATOR.addEventListener('click', generateCpf);
BTN_CPF_VALIDATOR.addEventListener('click', validateCpf);
BTN_CLEAR_CPF_VALIDATOR.addEventListener('click', clearCpf);
BTN_CNPJ_GENERATOR.addEventListener('click', generateCnpj);
BTN_CNPJ_VALIDATOR.addEventListener('click', validateCnpj);
BTN_CLEAR_CNPJ_VALIDATOR.addEventListener('click', clearCnpj);


// BTN FUNCTIONS

function generateCpf(): void {
    INPUT_CPF_GENERATOR.value = cpfGenerator();
    INPUT_CPF_VALIDATOR.value = INPUT_CPF_GENERATOR.value;
    validateCpf();
}

function validateCpf(): void {
    TEXT_CPF.innerText = cpfValidator(INPUT_CPF_VALIDATOR.value);
}

function clearCpf(): void {
    TEXT_CPF.innerText = '';
    INPUT_CPF_VALIDATOR.value = '';
}

function generateCnpj(): void {
    INPUT_CNPJ_GENERATOR.value = cnpjGenerator();
    INPUT_CNPJ_VALIDATOR.value = INPUT_CNPJ_GENERATOR.value;
    validateCnpj();
}

function validateCnpj(): void {
    TEXT_CNPJ.innerText = cnpjValidator(INPUT_CNPJ_VALIDATOR.value);
}

function clearCnpj(): void {
    TEXT_CNPJ.innerText = '';
    INPUT_CNPJ_VALIDATOR.value = '';
}


// FORMAT FUNCTIONS

function formatCpf(cpf: string, type: string = ''): string {
    if (type === 'number') {
        let block1 = `${cpf.substring(0,3)}`;
        let block2 = `${cpf.substring(4,7)}`;
        let block3 = `${cpf.substring(8,11)}`;
        let block4 = `${cpf.substring(12)}`;
        
        return `${block1}` + `${block2}` + `${block3}` + `${block4}`
    }
    
    let block1 = `${cpf.substring(0,3)}`;
    let block2 = `${cpf.substring(3,6)}`;
    let block3 = `${cpf.substring(6,9)}`;
    let block4 = `${cpf.substring(9)}`;
    
    return `${block1}` + '.' + `${block2}` + '.' + `${block3}` + '-' + `${block4}`
}

function formatCnpj(cnpj: string, type: string = ''): string {

    if (type === 'number') {
        let block1 = `${cnpj.substring(0,2)}`;
        let block2 = `${cnpj.substring(3,6)}`;
        let block3 = `${cnpj.substring(7,10)}`;
        let block4 = `${cnpj.substring(11,15)}`;
        let block5 = `${cnpj.substring(16)}`;

        return `${block1}` + `${block2}` + `${block3}` + `${block4}` + `${block5}`
    }

    let block1 = `${cnpj.substring(0,2)}`;
    let block2 = `${cnpj.substring(2,5)}`;
    let block3 = `${cnpj.substring(5,8)}`;
    let block4 = `${cnpj.substring(8,12)}`;
    let block5 = `${cnpj.substring(12)}`;

    return `${block1}` + '.' + `${block2}` + '.' + `${block3}` + '/' + `${block4}` + '-' + `${block5}`
}


// GET RANDOM CPF OR CNPJ WITHOUT DIGITS

function getRandomCpfWithoutDigits(): number {
    let min = 100000000;
    let max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCnpjWithoutDigits(): number {
    let min = 100000000000;
    let max = 999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// CPF FUNCTIONS

function cpfGenerator(): string {
    let new_cpf = `${getRandomCpfWithoutDigits()}`;
    let reverse = 10;
    let total = 0;
    let index = 0;
    let digit;

    for (let i = 0; i < 19; i++) {

        if (index > 8 && i < 10) {
            index -= 9;
        }

        total += +new_cpf[index] * reverse;
        reverse--;
        index++;

        if (reverse < 2) {
            reverse = 11;

            digit = 11 - (total % 11);
            if (digit > 9) {
                digit = 0;
                new_cpf += digit.toString();
                total = 0;
            } else {
                new_cpf += digit.toString();
                total = 0;
            }
        }
    
    }

    return formatCpf(new_cpf);
}

function cpfValidator(cpf: string): string {

    let new_cpf;

    if (cpf.length < 12) {
        new_cpf = cpf.substring(0, 9);
    } else {
        new_cpf = formatCpf(cpf, 'number').substring(0, 9);
    }
    
    let reverse = 10;
    let total = 0;
    let index = 0;
    let digit;

    for (let i = 0; i < 19; i++) {

        if (index > 8 && i < 10) {
            index -= 9;
        }

        total += +new_cpf[index] * reverse;
        reverse--;
        index++;

        if (reverse < 2) {
            reverse = 11;

            digit = 11 - (total % 11);
            if (digit > 9) {
                digit = 0;
                new_cpf += digit.toString();
                total = 0;
            } else {
                new_cpf += digit.toString();
                total = 0;
            }
        }
    
    }

    let sequencie = new_cpf === new_cpf[0].repeat(cpf.length);

    if (cpf.length > 11) {
        if (cpf === formatCpf(new_cpf) && !sequencie) {
            return 'O CPF É VÁLIDO'
        }
    } else {
        if (cpf === new_cpf && !sequencie) {
            return 'O CPF É VÁLIDO'
        }
    }
    return 'O CPF É INVÁLIDO'
}


// CNPJ FUNCTIONS

function cnpjGenerator(): string {
    let new_cnpj = `${getRandomCnpjWithoutDigits()}`;

    let reverse = 13
    let total = 0;
    let index = 0;
    let digit;
    let mult = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 25; i++) {

        if (index > 11 && i < 13) {
            index -= 12;
            mult.unshift(6);
        }
        
        total += +new_cnpj[index] * mult[index];
        index++;
        reverse--;

        if (reverse < 2) {
            reverse = 14;

            digit = 11 - (total % 11);
            if (digit > 9) {
                digit = 0;
                new_cnpj += digit.toString();
                total = 0;
            } else {
                new_cnpj += digit.toString();
                total = 0;
            }
        }
    }

    return formatCnpj(new_cnpj)
}

function cnpjValidator(cnpj: string): string {

    let new_cnpj;

    if (cnpj.length < 15) {
        new_cnpj = cnpj.substring(0, 12);
    } else {
        new_cnpj = formatCnpj(cnpj, 'number').substring(0, 12);
    }
    
    let reverse = 13
    let total = 0;
    let index = 0;
    let digit;
    let mult = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    for (let i = 0; i < 25; i++) {

        if (index > 11 && i < 13) {
            index -= 12;
            mult.unshift(6);
        }
        
        total += +new_cnpj[index] * mult[index];
        index++;
        reverse--;

        if (reverse < 2) {
            reverse = 14;

            digit = 11 - (total % 11);
            if (digit > 9) {
                digit = 0;
                new_cnpj += digit.toString();
                total = 0;
            } else {
                new_cnpj += digit.toString();
                total = 0;
            }
        }
    }
    
    let sequencie = new_cnpj === new_cnpj[0].repeat(cnpj.length);

    if (cnpj.length > 14) {
        if (cnpj === formatCnpj(new_cnpj) && !sequencie) {
            return 'O CNPJ É VÁLIDO'
        }
    } else {
        if (cnpj === new_cnpj && !sequencie) {
            return 'O CNPJ É VÁLIDO'
        }
    }
    return 'O CNPJ É INVÁLIDO'
}