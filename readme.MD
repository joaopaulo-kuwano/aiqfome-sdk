# SDK Typescript para AiqFome

## Github para sugestões e correções
https://github.com/joaopaulo-kuwano/aiqfome-sdk

Biblioteca para conexão com Aiqfome, seguindo especificações da documentação oficial: 
[SwaggerHub](https://app.swaggerhub.com/apis-docs/aiq6/api-aiqfome/1.0.0)

## Como usar

Para usar o sdk você precisará setar os seguintes parâmetros:
* base_url ( URL base da api, padrão: 'https://homolog-alfredo.aiqfome.com/alfredo' )
* client_id ( fornecido pelo Aiqfome )
* client_secret ( fornecido pelo Aiqfome )
* client_authorization ( fornecido pelo Aiqfome )
* user_agent ( fornecido pelo Aiqfome, padrão: 'teste@teste.com' )
* user_login ( login do lojista, igual ao usado para acessar o painel Geraldo ( [Link](https://geraldo-restaurantes.aiqfome.com/login) ))
* user_pass ( senha do lojista, igual ao usado para acessar o painel Geraldo ( [Link](https://geraldo-restaurantes.aiqfome.com/login) ))

Instancie a classe principal e autentique seu usuário:

```
import { Aiqfome } from 'aiqfome-sdk'
const aiq = new Aiqfome()
const sdk = await aiq.auth_token({  }) // informe os parametros citados acima
```

Depois de autenticado, se preferir, você pode instanciar a classe em outros locais para usar as funcionalidades da api:

```
import { Aiqfome } from 'aiqfome-sdk'
const aiq = new Aiqfome()
const sdk = await aiq.orders_search({ date_start: '2024-11-01' })
```

## Funções implementadas

* auth_token - POST /auth/token - (gerar token de usuario)
* orders_search - GET /orders/search - (listagem de pedidos)
* order_search - GET /orders/{order_id} - (detalhes do pedido)
* store_list - GET /store - (listagem de lojas do usuario)
* webhook_list - GET /store/{store_id}/webhooks - (listagem de webhooks da loja)
* webhook_add - POST /store/{store_id}/webhooks - (adicionar webhook à loja)
* webhook_delete - DELETE /store/{store_id}/webhooks/{hook_id} - (excluir webook)
* new_order - POST /new_order - (gerar pedido de teste, disponível apenas em homologação) 
