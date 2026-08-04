<template>
  <div class="base-dashboard-card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </header>
    
    <main class="card-body">
      <slot></slot> <!-- 기본 슬롯 -->
    </main>

    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.base-dashboard-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
}
</style>