<template>
	<div class="wrapper">
	    <v-head></v-head>
	    <v-sidebar></v-sidebar>
	    <v-content></v-content>
	</div>
</template>

<script>
	import vHead from '../components/common/Header.vue';
	import vSidebar from '../components/common/Sidebar.vue';
	import vContent from '../components/common/Content.vue';
	export default {
		data() {
			return {
				sysName:'浙江电力公众号后台管理系统',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: ''
			}
		},
		methods: {
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			}

		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		},components:{
            vHead
            ,vSidebar
            ,vContent
        }
	}

</script>

