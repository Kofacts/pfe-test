<template>
  <div class="home">
    <Navbar @update:filters="mutateFilters"/>
    <div class="content-box">
      <div class="content-box__sidepanel">
        <h6 class="title">EDIT PANEL</h6>

        <ul class="content-box__sidepanel-list">
          <li
            v-for="(filterKey, index) in tableKeys"
            :key="index"
            :class="{
              selected_column: Object.keys(filters).includes(filterKey),
            }"
          >
            <span @click="toggleColumn(filterKey, index)" style="width: 100%;height: 100%;">
              {{
              filterKey | keyToSentence
              }}
            </span>
            <a-popconfirm
              ok-text="Apply"
              cancel-text="Clear"
              placement="rightTop"
              @confirm="confirm(filterKey)"
              @cancel="cancel(filterKey)"
            >
              <a-button v-show="isFilterable(filterKey)">Filter</a-button>
              <div slot="title" style="width:300px;padding-bottom:30px">
                <small>Filter for</small>
                <h6 style="font-size:15px">{{ filterKey | keyToSentence }}</h6>

                <div class="filter-form">
                  <div class="input">
                    <small>Operator</small>
                    <div>
                      <a-select
                        @change="(e) =>customFilters[filterKey]['op'] = e"
                        style="width: 120px"
                      >
                        <a-select-option value="gt">Greater than</a-select-option>
                        <a-select-option value="lt">Less than</a-select-option>
                        <a-select-option value="e">Equals TO</a-select-option>
                        <a-select-option value="ne">Not Equal to</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <div class="input">
                    <small>Value</small>
                    <div>
                      <a-input
                        v-model="customFilters[filterKey]['value']"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a-popconfirm>
          </li>
        </ul>
      </div>
      <div class="content-box__mainpanel">
        <table id="custom-table">
          <thead>
            <tr>
              <th
                scope="col"
                v-for="(column, i) of Object.keys(filters)"
                :key="i"
              >{{ column | keyToSentence}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, j) in filteredData" :key="j">
              <td v-for="(row, k) of Object.values(data)" :key="k">
                <div style="display:flex;align-items:center">
                  <span v-html="row && row.icon ? row.icon : ''"></span>
                  <span
                    class="text-bold"
                    style="padding-left:7px"
                  >{{ row && row.name ? row.name : row }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-bold {
  font-weight: 600;
}
.content-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.content-box .content-box__sidepanel {
  width: 25vw;
  background: #f8f9fb;
  height: inherit;
  text-align: left;
}
.filter-form {
  display: flex;
  flex-direction: row;
}
.filter-form .input {
  margin-right: 20px;
}
.content-box .content-box__sidepanel .title {
  padding: 30px;
  padding-top: 24px;
  padding-bottom: 20px;
  font-size: 12px;
  letter-spacing: 4px;
  color: #7a99d9;
  font-weight: bold;
}
.content-box .content-box__sidepanel .content-box__sidepanel-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.content-box .content-box__sidepanel .content-box__sidepanel-list li {
  background: transparent;
  padding: 10px 30px 10px 30px;
  margin-bottom: 5px;
  opacity: 0.7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  height: 40px;
  cursor: pointer;
}
.content-box .content-box__sidepanel .content-box__sidepanel-list li:hover {
  background: #e4e4e4;
}
.content-box .content-box__mainpanel {
  width: 75vw;
  background: white;
  height: inherit;
}
#custom-table {
  border-collapse: collapse;
  width: 100%;
}

#custom-table td,
#custom-table th {
  padding-left: 24px !important;
  padding: 8px;
}
#custom-table thead tr {
  padding-left: 20px;
  background: #f8f9fb;
}
/* #custom-table tr {
  background-color: #f8f9fb;
  display: flex;
  flex-direction: row;
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
} */
#custom-table tr {
  /* background-color: #f2f2f2; */
  border-bottom: 1px solid #f5f5f5;
}
#custom-table tbody tr {
  text-align: left;
  height: 50px;
}

#custom-table tr:hover {
  background-color: #ddd;
}

#custom-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: black;
  opacity: 0.7;
}
.selected_column {
  background-color: #e6eaf8 !important;
  font-weight: 600 !important;
}
</style>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import icons from "@/helpers/icons.js";
export default {
  name: "Home",
  components: {
    Navbar
  },
  data() {
    return {
      buildData: [
        {
          customerName: { name: "Basecamp", icon: icons.basecamp },
          status: "available",
          syncedFrom: "Zuora",
          startDate: "2019-01-01",
          mrr: 1200,
          termLength: 12,
          invoiceNo: 1
        },
        {
          customerName: { name: "Intercom", icon: icons.intercom },
          status: "available",
          syncedFrom: "Stripe",
          startDate: "2019-01-01",
          mrr: 455,
          termLength: 3,
          invoiceNo: 2
        },
        {
          customerName: {name: "Dropbox", icon: icons.dropbox},
          status: "available",
          syncedFrom: "Chargebee",
          startDate: "2019-01-01",
          mrr: 1200,
          termLength: 5,
          invoiceNo: 3
        },
        {
          customerName: {name:"Zoom",icon:icons.zoom},
          status: "available",
          syncedFrom: "Zuora",
          startDate: "2019-01-01",
          mrr: 446,
          termLength: 6,
          invoiceNo: 4
        },
        {
          customerName: {name: "Heroku", icon:icons.heroku},
          status: "available",
          syncedFrom: "Zuora",
          startDate: "2019-01-01",
          mrr: 1455,
          termLength: 2,
          invoiceNo: 5
        },
        {
          customerName: {name: "Apple",icon:icons.apple},
          status: "available",
          syncedFrom: "Zuora",
          startDate: "2019-01-01",
          mrr: 899,
          termLength: 6,
          invoiceNo: 6
        },
        {
          customerName: {name: "Zeneifts",icon:icons.italic},
          status: "available",
          syncedFrom: "Stripe",
          startDate: "2019-01-01",
          mrr: 5666,
          termLength: 3,
          invoiceNo: 7
        },
        {
          customerName: {name: "Notion",icon:icons.notion},
          status: "available",
          syncedFrom: "Stripe",
          startDate: "2019-01-01",
          mrr: 1200,
          termLength: 6,
          invoiceNo: 8
        },
        {
          customerName: {name: "Italic",icon: icons.italic},
          status: "available",
          syncedFrom: "Stripe",
          startDate: "2019-01-01",
          mrr: 1200,
          termLength: 8,
          invoiceNo: 9
        },
        {
          customerName: {name: "Netflix",icon:icons.netflix},
          status: "available",
          syncedFrom: "Zuora",
          startDate: "2019-01-01",
          mrr: 890,
          termLength: 1,
          invoiceNo: 10
        }
      ],
      filteredData: [],
      filters: {},
      customFilters: {}
    };
  },
  methods: {
    isFilterable(key) {
      if (key == "mrr" || key == "termLength" || key == "invoiceNo") {
        return true;
      }
      return false;
    },
    confirm(key) {
      this.filters[key] = this.customFilters[key];
      this.filterData();
    },
    cancel(key) {
      this.customFilters[key] = { op: null, value: null };
      this.filters[key] = null;
      this.filterData();
    },
    toggleColumn(key) {
      // console.log(key, this.filters);
      if (Object.keys(this.filters).includes(key)) {
        delete this.filters[key];
      } else {
        this.filters[key] = null;
      }
      this.filterData();
    },
    filterData() {
      let filtered = this.buildData;

      for (let i in this.filters) {
        let params = this.filters[i];
        if (!params || !params["op"] || !params["value"]) {
          continue;
        }

        filtered = filtered.filter(s => {
          switch (params["op"]) {
            case "gt":
              // if row data is NOT greater than, skip
              if (s[i] <= params["value"]) {
                return false;
              }
              break;
            case "lt":
              // if row data is NOT less than, skip
              if (s[i] >= params["value"]) {
                return false;
              }
              break;
            case "e":
              // if row data is NOT equal, skip
              if (s[i] != params["value"]) {
                return false;
              }
              break;
            case "ne":
              // if row data is equal to, skip
              if (s[i] == params["value"]) {
                return false;
              }
              break;
          }
          // if non of the switch statements is met, then it's valid
          return true;
        });
      }

      filtered = filtered.map(s => {
        let newArray = {};
        for (let i in this.filters) {
          newArray[i] = s[i];
        }
        return newArray;
      });

      this.filteredData = filtered;
      window.sessionStorage.setItem("filters", JSON.stringify(this.filters));
    },
    mutateFilters(filters) {
      this.filters = filters;
      this.filterData();
    }
  },
  computed: {
    tableKeys() {
      return Object.keys(Object.assign({}, ...this.buildData));
    }
  },
  filters: {
    keyToSentence(val) {
      var result = val.replace(/([A-Z])/g, " $1");
      var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      // let filterKey = Object.keys(val)
      return finalResult;
    }
  },
  created() {
    this.tableKeys.filter(s => {
      this.customFilters[s] = { op: null, value: null };
    });
  }
};
</script>
