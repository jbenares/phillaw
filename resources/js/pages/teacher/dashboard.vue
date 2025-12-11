<template>
    <navigation>
		<!-- Top Navigation -->
		<header
			class="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-30 h-16 flex items-center justify-between px-6"
		>
			<h1 class="text-lg font-semibold text-green-700">Teacher Dashboard</h1>

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
					<div class="p-6 rounded-xl bg-green-600 text-white shadow">
						<h3 class="text-xl font-semibold">My Courses</h3>
						<p class="text-3xl font-bold mt-1">5</p>
					</div>

					<div class="p-6 rounded-xl bg-green-700 text-white shadow">
						<h3 class="text-xl font-semibold">My Students</h3>
						<p class="text-3xl font-bold mt-1">128</p>
					</div>

					<div class="p-6 rounded-xl bg-green-800 text-white shadow">
						<h3 class="text-xl font-semibold">Pending Grades</h3>
						<p class="text-3xl font-bold mt-1">14</p>
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="mb-8">
					<h2 class="text-xl font-bold text-green-700 mb-3">Quick Actions</h2>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<button
							@click="goTo('subjects')"
							class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
						>
							<h3 class="font-semibold text-green-700">View Subjects</h3>
							<p class="text-sm text-gray-600">See subjects you are handling</p>
						</button>

						<button
							@click="goTo('students')"
							class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
						>
							<h3 class="font-semibold text-green-700">Students List</h3>
							<p class="text-sm text-gray-600">View students under your subjects</p>
						</button>

						<button
							@click="goTo('grades')"
							class="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
						>
							<h3 class="font-semibold text-green-700">Add / Edit Grades</h3>
							<p class="text-sm text-gray-600">Record or update student grades</p>
						</button>
					</div>
				</div>

				<!-- Recent Activities -->
				<div>
					<h2 class="text-xl font-bold text-green-700 mb-3">Recent Activity</h2>

					<div class="bg-white rounded-xl shadow border p-4">
						<ul class="space-y-3 text-gray-700">
							<li class="flex items-center justify-between">
								<span>Submitted grades for <b>Math 101</b></span>
								<span class="text-sm text-gray-500">2h ago</span>
							</li>
							<li class="flex items-center justify-between">
								<span>Updated student grade for <b>Juan Dela Cruz</b></span>
								<span class="text-sm text-gray-500">6h ago</span>
							</li>
							<li class="flex items-center justify-between">
								<span>New student <b>Anne Lopez</b> enrolled in <b>Science 102</b></span>
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
	console.log("Navigating to:", page);
};
</script>
