import { ResponseModel } from '../common/models/response.model';

/**
 * @param data Dados a serem passados como resposta
 * @param status Status da resposta
 * @param error Se existir enviar o erro
 * @returns ResponseModel
 */
export default function ResponseFactory(data: any, error?: any): ResponseModel {
  return {
    success: !error,
    data: data,
    error: error,
  };
}
