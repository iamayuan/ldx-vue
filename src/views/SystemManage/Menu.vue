<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="菜单组"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getMenuPage">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAddList">新增菜单组</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增菜单</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="菜单组名字"  sortable>
			</el-table-column>
			<el-table-column prop="code" label="排序位置"  sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="菜单组名字" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新排序位置" prop="code">
					<el-input v-model="editForm.tag" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="菜单组名字" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新排序位置" prop="tag">
					<el-input v-model="addForm.tag" auto-complete="off"></el-input>
				</el-form-item>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left:30px;">全选</el-checkbox>
				  <div style="margin: 15px 0;"></div>
				  <el-checkbox-group style="margin-left:30px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
				  </el-checkbox-group>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增菜单界面-->
		<el-dialog title="新增" v-model="addFormMenuVisible" :close-on-click-modal="false">
			<el-form :model="addMenuForm" label-width="120px" :rules="addMenuFormRules" ref="addMenuForm">
				<el-form-item label="菜单组名字" prop="name">
					<el-input v-model="addMenuForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新排序位置" prop="tag">
					<el-input v-model="addMenuForm.tag" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormMenuVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getMenuList,editMenuList, createMenuList,deleteMenuList } from '../../api/api';
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入菜单组名字', trigger: 'blur' }
					],
					tag: [
						{ required:true, message:'请输入排序位置',trigger :'blur'}
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					tag:0,

				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入菜单组名字', trigger: 'blur' }
					],
					tag: [
						{ required:true, message:'请输入排序位置',trigger :'blur'}
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					tag:0,
					menuNodes:[]

				},
				addFormMenuVisible: false,//新增界面是否显示
				addLoading: false,
				addMenuFormRules: {
					name: [
						{ required: true, message: '请输入菜单组名字', trigger: 'blur' }
					],
					tag: [
						{ required:true, message:'请输入排序位置',trigger :'blur'}
					]
				},
				//新增界面数据
				addMenuForm: {
					name: '',
					tag:0,
					menuNodes:[]

				},
				checkAll: true,
		        checkedCities: ['上海', '北京'],
		        cities: cityOptions,
		        isIndeterminate: true

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getMenuPage();
			},
			handleCheckAllChange(event) {
		        this.checkedCities = event.target.checked ? cityOptions : [];
		        this.isIndeterminate = false;
	      	},
	      	handleCheckedCitiesChange(value) {
	        	let checkedCount = value.length;
	        	this.checkAll = checkedCount === this.cities.length;
	        	this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	      	},
			//获取菜单组
			getMenuPage() {
				let para = {
					name: this.filters.name
				};
				this.listLoading = true;
				getMenuList(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					deleteMenuList(para).then((res) => {
						console.log(res)
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getMenuPage();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAddList: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					tag :0,
					menuNodes:[]

				};
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					tag :0,
					menuNodes:[]

				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							editMenuList(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getMenuPage();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							createMenuList(para).then((res) => {
								this.addLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getMenuPage();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getMenuPage();
		}
	}

</script>

<style scoped>

</style>