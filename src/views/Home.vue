<style lang="scss" scoped>
.turbulence {
  width: 100%;
  display: flex;
}
.icing {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
</style>
<template>
  <div class="turbulence">
    <el-card
      :style="{ width: '50%', paddingRight: '20px' }"
      shadow="hover"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <span>颠簸预报</span>
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

  <div class="icing">
    <el-card
      :style="{ width: '50%', paddingRight: '20px' }"
      shadow="hover"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <span>积冰预报</span>
        </div>
      </template>

      <el-form :model="formIce" label-width="120px" :inline="false">
        <el-form-item label="air(℃)">
          <el-input v-model="formIce.air"></el-input>
        </el-form-item>
        <el-form-item label="hgt(m)">
          <el-input v-model="formIce.hgt"></el-input>
        </el-form-item>
        <el-form-item label="omega(Pa/s)">
          <el-input v-model="formIce.omega"></el-input>
        </el-form-item>
        <el-form-item label="uwnd(m/s)">
          <el-input v-model="formIce.uwnd"></el-input>
        </el-form-item>
        <el-form-item label="vwnd(m/s)">
          <el-input v-model="formIce.vwnd"></el-input>
        </el-form-item>
        <el-form-item label="rhum(%)">
          <el-input v-model="formIce.rhum"></el-input>
        </el-form-item>
        <el-form-item label="shum(kg/kg)">
          <el-input v-model="formIce.shum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onIcingSubmit"> 预测 </el-button>
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
          <span>{{ resultIce.flag }}</span>
        </el-form-item>
        <el-form-item label="概率">
          <span>
            {{ resultIce.prob && formatProb(resultIce.prob) }}
          </span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { turbulence, icing } from "../api";
import { ParamsType, IcingParamsType } from "../api/types";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
      form: { air: 20, hgt: 5000, omega: 0.1, uwnd: 10, vwnd: 2 },
      rules: {},
      result: { prob: "", flag: "" },
      formIce: {
        air: 20,
        hgt: 3000,
        omega: 0.2,
        uwnd: 20,
        vwnd: 4,
        rhum: 20,
        shum: 30
      },
      resultIce: { prob: "", flag: "" }
    });
    function onSubmit() {
      console.info("turbulence submit");
      const p: ParamsType = {
        air: state.form.air,
        hgt: state.form.hgt,
        omega: state.form.omega,
        uwnd: state.form.uwnd,
        vwnd: state.form.vwnd
      };
      turbulence(p)
        .then(result => {
          console.info("turbulence 返回结果 -- ", result.data);
          state.result = result.data;
        })
        .catch(error => {
          console.info("turbulence 出错了 -- ", error);
        });
    }
    function formatProb(prob: number): string {
      const p: string = (100 * prob).toFixed(1) + "%";
      return p;
    }
    function onIcingSubmit() {
      console.info("icing submit");
      const p: IcingParamsType = {
        air: state.formIce.air,
        hgt: state.formIce.hgt,
        omega: state.formIce.omega,
        uwnd: state.formIce.uwnd,
        vwnd: state.formIce.vwnd,
        rhum: state.formIce.rhum,
        shum: state.formIce.shum
      };
      icing(p)
        .then(result => {
          console.info("icing 返回结果 -- ", result.data);
          state.resultIce = result.data;
        })
        .catch(error => {
          console.info("icing 出错了 -- ", error);
        });
    }
    return {
      ...toRefs(state),
      onSubmit,
      formatProb,
      onIcingSubmit
    };
  }
});
</script>
