<template>
    <navigation>
		<!-- Top Navigation -->
		<header
			class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
		>
			<h1 class="text-lg font-semibold text-gray-700 ">Dean Dashboard</h1>

			<button
			@click="mobileOpen = !mobileOpen"
			class="p-2 rounded-md text-gray-700 hover:bg-gray-200 md:hidden"
			>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
				fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7"/>
			</svg>
			</button>
		</header>

      <!-- Dashboard Body -->
		<div class="p-4">
			<div class="pt-20 px-4 pb-10">

				<!-- Overview Cards -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div class="p-6 rounded-xl bg-[#7030A0] text-white shadow">
					<h3 class="text-xl font-semibold">Teachers</h3>
					<p class="text-3xl font-bold mt-1">34</p>
				</div>

				<div class="p-6 rounded-xl bg-[#5a267f] text-white shadow">
					<h3 class="text-xl font-semibold">Courses</h3>
					<p class="text-3xl font-bold mt-1">18</p>
				</div>

				<div class="p-6 rounded-xl bg-[#4a1f65] text-white shadow">
					<h3 class="text-xl font-semibold">Active Assignments</h3>
					<p class="text-3xl font-bold mt-1">22</p>
				</div>
				</div>

				<!-- Quick Actions -->
				<div class="mb-8">
				<h2 class="text-xl font-bold text-gray-700 mb-3">Quick Actions</h2>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button
					@click="goTo('teachers')"
					class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
					>
					<h3 class="font-semibold text-gray-700">Manage Teachers</h3>
					<p class="text-sm text-gray-600">View, add, and edit teachers</p>
					</button>

					<button
					@click="goTo('courses')"
					class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
					>
					<h3 class="font-semibold text-gray-700">Manage Courses</h3>
					<p class="text-sm text-gray-600">Create and update course listings</p>
					</button>

					<button
					@click="goTo('assign')"
					class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
					>
					<h3 class="font-semibold text-gray-700">Assign Teachers</h3>
					<p class="text-sm text-gray-600">Assign teachers to courses</p>
					</button>
				</div>
				</div>

				<!-- Recent Activities -->
				<div>
				<h2 class="text-xl font-bold text-gray-700 mb-3">Recent Activity</h2>

				<div class="bg-white rounded-xl shadow border p-4">
					<ul class="space-y-3 text-gray-700">
					<li class="flex items-center justify-between">
						<span>Teacher <b>Maria Santos</b> assigned to <b>Math 101</b></span>
						<span class="text-sm text-gray-500">2h ago</span>
					</li>
					<li class="flex items-center justify-between">
						<span>New course <b>Physics 201</b> created</span>
						<span class="text-sm text-gray-500">5h ago</span>
					</li>
					<li class="flex items-center justify-between">
						<span><b>John Cruz</b> added as a new teacher</span>
						<span class="text-sm text-gray-500">1d ago</span>
					</li>
					</ul>
				</div>
				</div>

			</div>
		</div>
    </navigation>
</template>

<script setup>
import navigation from "./components/navigation.vue";
const goTo = (page) => {
	// route logic later (Laravel + Vue)
	console.log("Navigating to:", page);
};
</script>
