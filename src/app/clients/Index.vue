<template>
  <section class="section">
    <div class="container">

      <div class="buttons">
        <b-button type="is-success">
          <i class="fas fa-plus"></i> Novo cliente
        </b-button>
      </div>

      <b-table :data="data">

        <template slot-scope="props">
          <b-table-column field="id" label="ID">{{ props.row.id }}</b-table-column>
          <b-table-column field="name" label="Nome">{{ props.row.name }}</b-table-column>
          <b-table-column field="phone" label="Telefone">{{ props.row.phone }}</b-table-column>
          <b-table-column field="email" label="Email">{{ props.row.email }}</b-table-column>
          <b-table-column field="actions" label="Ações" width="120">
            <div class="buttons">
              <b-button type="is-warning" title="Alterar">
                <i class="fas fa-pen"></i>
              </b-button>
              <b-button type="is-danger" title="Excluir">
                <i class="fas fa-times"></i>
              </b-button>
            </div>
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p><i class="fas fa-frown fa-3x"></i></p>
              <p>Nenhum cliente cadastrado</p>
            </div>
          </section>
        </template>

      </b-table>

    </div>
  </section>
</template>

<script>
export default {
  name: "Clients",
  data() {
    return {
      data: [
        {
          id: 1,
          name: "Jesse",
          phone: "(16) 99999-1234",
          email: "teste@etus.com.br"
        },
        {
          id: 2,
          name: "John",
          phone: "(16) 99999-1234",
          email: "teste@etus.com.br"
        },
        {
          id: 3,
          name: "Tina",
          phone: "(16) 99999-1234",
          email: "teste@etus.com.br"
        },
        {
          id: 4,
          name: "Clarence",
          phone: "(16) 99999-1234",
          email: "teste@etus.com.br"
        },
        {
          id: 5,
          name: "Anne",
          phone: "(16) 99999-1234",
          email: "teste@etus.com.br"
        }
      ],
    };
  }
};
</script>
