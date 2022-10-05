import { LabelValue } from "src/app/shared/models/label-value";

export enum ToolbarButtonAction {
    HOMEPAGE = 'Homepage',
    ARTIGO = 'Novo Artigo',
    LOGIN = 'Login/cadastro',
    LOGOUT = 'Desconectar',
    CATEGORIA = 'Categoria',
    INFO = 'Saiba +'
}

export type ToolbarButtonActionType = keyof typeof ToolbarButtonAction;

/**
 * @returns Todas as opções da toolbar
 */
export function getToolbarButtonActionOptions(): LabelValue[] {
    const keys = Object.keys(ToolbarButtonAction);
    return Object.values(ToolbarButtonAction).map((label, index) => {
        return { value: keys[index], label: label };
    });
}

/**
 * @returns Opções da toolbar para usuários não logados
 */
export function getToolbarButtonActionAnonOptions(): LabelValue[] {
    return [
        { label: ToolbarButtonAction.LOGIN, value: 'LOGIN' },
        { label: ToolbarButtonAction.INFO, value: 'INFO' },
    ]
}

/**
 * @returns Opções da toolbar para usuários logados
 */
export function getToolbarButtonActionLogadoOptions(): LabelValue[] {
    return [
        { label: ToolbarButtonAction.ARTIGO, value: 'ARTIGO' },
        { label: ToolbarButtonAction.INFO, value: 'INFO' },
    ]
}

/**
 * @returns Opções da toolbar para admins
 */
export function getToolbarButtonActionAdminOptions(): LabelValue[] {
    return [
        { label: ToolbarButtonAction.CATEGORIA, value: 'CATEGORIA' },
        { label: ToolbarButtonAction.ARTIGO, value: 'ARTIGO' },
        { label: ToolbarButtonAction.INFO, value: 'INFO' },
    ]
}