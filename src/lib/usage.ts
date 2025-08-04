import { auth } from "@clerk/nextjs/server";
import { RateLimiterPrisma } from "rate-limiter-flexible";

import { prisma } from "@/lib/db";

const FREEE_POINTS = 20;
const PRO_POINTS = 100;
const DURATION = 30 * 24 * 60 * 60; // 30 days;
const GENERATE_COST = 1;

export async function getUsageTracker() {
    const { has } = await auth();

    const hasProAccess = has({ plan: "pro" });
    const usageTracker = new RateLimiterPrisma({
        storeClient: prisma,
        tableName: "Usage",
        points: hasProAccess ? PRO_POINTS : FREEE_POINTS,
        duration: DURATION,
    });

    return usageTracker;
}

export async function consumeCredits() {
    const { userId } = await auth();


    if (!userId) {
        throw new Error("Unauthorized");
    }

    const usageTracker = await getUsageTracker();
    const result = await usageTracker.consume(userId, GENERATE_COST);
    return result;
}

export async function getUserStatus() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const usageTracker = await getUsageTracker();
    const result = await usageTracker.get(userId);
    return result;
}