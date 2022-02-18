<template>
  <q-page class="q-pa-lg">
    <q-breadcrumbs class="text-grey">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el
        to="/patient"
        label="Patient"
        icon="fas fa-user-injured"
      />
      <q-breadcrumbs-el label="List" icon="fas fa-clipboard-list" />
    </q-breadcrumbs>

    <!-- Historic Patient listing -->
  </q-page>
</template>
