<template>

<div class="flex flex-col-reverse lg:flex-col items-center justify-center align-middle gap-4 text-gray-800">

    <p class="italic text-lg prose">{{ $root.strings.intro }}</p>

    <p class="text-2xl font-thin prose">{{ $root.strings.splash_cta }}</p>

    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="rotate-90 lg:rotate-0 h-24 w-14 self-end lg:self-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>

</div>

</template>