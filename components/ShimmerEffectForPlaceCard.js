import React from 'react'

const ShimmerEffectForPlaceCard = () => {
    return (
        <div class="border border-red-100 shadow rounded-md max-w-sm w-full mx-auto">
            <div class="animate-pulse flex flex-col p-2">
                <div class="rounded-t-md bg-red-100 h-[100px] w-full"></div>
                <div class="flex-1 space-y-6 py-3">
                    <div class="h-5 bg-red-100 rounded"></div>
                    <div class="space-y-3">
                        <div class="h-2 bg-red-100 rounded"></div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-red-100 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShimmerEffectForPlaceCard