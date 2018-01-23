<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="20" class="logo">
				<span>浙江电力公众号后台管理系统</span>
			</el-col>
			<el-col :span="4" class="user-info">
			    <el-dropdown trigger="hover">
			        <span class="el-dropdown-link userinfo-inner">您好，{{sysUserName}}</span>
			        <el-dropdown-menu slot="dropdown">
			            <el-dropdown-item>修改密码</el-dropdown-item>
			            <el-dropdown-item>切换户号</el-dropdown-item>
			            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
			        </el-dropdown-menu>
			    </el-dropdown>
			</el-col>
		</el-col>
		
		<el-col :span="24" class="main">
			<aside>
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<menu-tree :nodes="$router.options.routes"></menu-tree>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="(item,index) in $route.matched" :key="item.name">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition>
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import MenuTree from '@/components/MenuTree'
export default {
	data() {
		return {
			nodes: this.$router.options.routes,
			sysName:'浙江电力公众号后台管理系统',
	        collapsed:false,
	        sysUserName: '超级管理员',
		}
	},
	created() {
		//这里没有直接使用this.$router.options.routes，是因为addRoute的路由规则，在这里this.$router.options.routes获取不到
		//有兴趣的可以看一下源码，是为什么获取不到，但是却又有规则了 
		//另外在开发的时候，可能由于是热部署，也会不断重复的给nodes添加元素，造成导航条有重复的，简单解决，可以设置一个开关
		let isLoadNodes = sessionStorage.getItem('isLoadNodes')
		if (!isLoadNodes) {
			let data = JSON.parse(window.sessionStorage.getItem('user'))
			this.nodes.push(...data)
			console.log(this.nodes)
			sessionStorage.setItem('isLoadNodes', 'true')
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function(a, b) {
		},
		//退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });


      }
	},
	mounted() {

	},
	components: {
		MenuTree
	}
}

</script>

<style scoped lang="scss">
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
    
	.header {
		height: 60px;
		line-height: 60px;
		background: #267fe4;
    	color: #ffffff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			.userinfo-inner {
				color: #c0ccda;
				cursor: pointer;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.userinfo-inner{
			color:#fff;
		}
		.logo {
			font-size: 22px;
			img {
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #20a0ff
			}
		}
	}
	.main {
		background: #fff;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			width: 230px;
		}
		.content-container {
			background: #f1f2f7;
			position: absolute;
			right: 0px;
			top: 0px;
			bottom: 0px;
			left: 230px;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container {
				margin-bottom: 15px;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				box-sizing: border-box;
			}
		}
	}
}
</style>