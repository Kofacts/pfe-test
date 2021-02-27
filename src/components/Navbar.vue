<template>
  <div class="container">
    <div class="menu">
      <div class="menu-left"><b>Subscriptions List</b></div>
      <div class="menu-right">
        <a-popconfirm
          ok-text="Apply"
          cancel-text="Clear"
          @confirm="handleJson()"
          @cancel="clearJsonString"
        >
          <a-button>Import</a-button>
          <div slot="title" style="width:300px;padding-bottom:30px">
            <small>Import Configuration</small>

            <div class="filter-form" style="margin-top:10px">
              <div class="input">
                <div>
                  <a-textarea
                    v-model="jsonString"
                    placeholder="Paste JSON here"
                  />
                </div>
              </div>
            </div>
          </div>
        </a-popconfirm>
        <a-popconfirm
          ok-text="Copy"
          cancel-text="Cancel"
          @confirm="copyJson()"
          @cancel="clearJson"
        >
          <a-button @click="() => jsonValue = getValue()">Export</a-button>
          <div slot="title" style="width:300px;padding-bottom:30px">
            <small>Export Configuration</small>

            <div class="filter-form">
              <div class="input">
                <br />
                <code>
                  {{ JSON.stringify(jsonValue, null, 4) }}
                </code>
              </div>
            </div>
          </div>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: white;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.container .menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.container .menu .menu-right button {
  margin-right: 17px;
}
</style>
<script>
export default {
  name: "NavBar",

  data() {
    return {
      jsonString: null,
      jsonValue: {},
    };
  },
  computed: {},
  methods: {
    getValue() {
      return JSON.parse(window.sessionStorage.getItem("filters") || "{}");
    },
    handleJson() {
      let jsonData = JSON.parse(this.jsonString);
      this.$emit("update:filters", jsonData);
    },
    clearJsonString() {
      this.jsonString = null;
    },

    copyJson() {
      let str = JSON.stringify(this.jsonValue, null, 4);
      const el = document.createElement("textarea");
      el.value = str;
      window.document.body.appendChild(el);

      /* Select the text field */
      el.select();
      el.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      window.document.execCommand("copy");
      this.$message.info('Configuration copied to clipboard!');
      setTimeout(() => {
        this.successMsg = false;
      }, 5000);
    },
    clearJson() {},
  },
};
</script>
