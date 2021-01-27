<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
}
</style>
<template>
  <div class="home">
    <el-card
      :style="{ width: '50%', paddingRight: '20px' }"
      shadow="hover"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <span>自变量输入</span>
        </div>
      </template>

      <el-form :model="form" label-width="120px" :inline="false">
        <el-form-item label="air(℃)">
          <el-input v-model="form.air"></el-input>
        </el-form-item>
        <el-form-item label="hgt(m)">
          <el-input v-model="form.hgt"></el-input>
        </el-form-item>
        <el-form-item label="omega(Pa/s)">
          <el-input v-model="form.omega"></el-input>
        </el-form-item>
        <el-form-item label="uwnd(m/s)">
          <el-input v-model="form.uwnd"></el-input>
        </el-form-item>
        <el-form-item label="vwnd(m/s)">
          <el-input v-model="form.vwnd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"> 预测 </el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>

    <!-- <div :style="{ width: '50%', paddingLeft: '20px' }"> -->
    <el-card
      :style="{ width: '50%', paddingLeft: '20px' }"
      shadow="hover"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <span>预测结果</span>
        </div>
      </template>
      <el-form label-width="120px" :inline="false">
        <el-form-item label="预测结果">
          <span>{{ result.flag }}</span>
        </el-form-item>
        <el-form-item label="概率">
          <span>
            {{ result.prob && formatProb(result.prob) }}
          </span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { turbulence } from "../api";
import { ParamsType } from "../api/types";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
      form: { air: 20, hgt: 5000, omega: 0.1, uwnd: 10, vwnd: 2 },
      rules: {},
      result: { prob: "", flag: "" }
    });
    function onSubmit() {
      console.info("submit");
      const p: ParamsType = {
        air: state.form.air,
        hgt: state.form.hgt,
        omega: state.form.omega,
        uwnd: state.form.uwnd,
        vwnd: state.form.vwnd
      };
      turbulence(p)
        .then(result => {
          console.info("返回结果 -- ", result.data);
          state.result = result.data;
        })
        .catch(error => {
          console.info("出错了 -- ", error);
        });
    }
    function formatProb(prob: number): string {
      const p: string = (100 * prob).toFixed(1) + "%";
      return p;
    }
    return {
      ...toRefs(state),
      onSubmit,
      formatProb
    };
  }
});
</script>
