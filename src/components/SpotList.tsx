'use client';

import { Spot } from '@/app/page';
import { motion, AnimatePresence } from 'framer-motion';

interface SpotListProps {
	spots: Spot[];
	isLoading?: boolean;
	onSpotSelect: (spot: Spot) => void;
	selectedSpotId?: string;
}

export default function SpotList({
	spots,
	isLoading,
	onSpotSelect,
	selectedSpotId,
}: SpotListProps) {
	if (isLoading) {
		return (
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between mb-6 px-2">
					<div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
					<div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
				</div>
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="p-5 rounded-3xl bg-white/40 border border-white/60 space-y-3"
						>
							<div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
							<div className="flex gap-2">
								<div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
								<div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
							</div>
							<div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between mb-6 px-2">
				<h2 className="text-2xl font-black text-gray-800 tracking-tight">
					保存済み
				</h2>
				<motion.span
					key={spots.length}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest"
				>
					{spots.length} Spots
				</motion.span>
			</div>

			<div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide hover:scrollbar-default transition-all">
				<AnimatePresence mode="popLayout">
					{spots.length === 0 ? (
						<motion.div
							key="empty"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="text-center py-20 bg-white/30 rounded-4xl border border-dashed border-gray-300"
						>
							<p className="text-gray-400 text-sm font-bold">
								まだスポットがありません。
								<br />
								右下のボタンから追加しよう！✨
							</p>
						</motion.div>
					) : (
						spots.map((spot, index) => (
							<motion.div
								key={spot.id || spot.name}
								layout
								initial={{ opacity: 0, x: -20, scale: 0.95 }}
								animate={{ opacity: 1, x: 0, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								onClick={() => onSpotSelect(spot)}
								whileHover={{
									scale: 1.02,
									backgroundColor: 'rgba(255, 255, 255, 0.8)',
								}}
								whileTap={{ scale: 0.98 }}
								className={`group p-5 rounded-3xl cursor-pointer transition-all border ${
									selectedSpotId === spot.id
										? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-primary/30'
										: 'bg-white/40 border-white/60 shadow-sm'
								}`}
							>
								<div className="flex justify-between items-start gap-2 mb-2">
									<h3 className="font-black text-gray-900 leading-tight text-lg group-hover:text-primary transition-colors">
										{spot.name}
									</h3>
								</div>

								<div className="flex flex-wrap gap-2 mb-3">
									<span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-primary/10 text-primary uppercase tracking-tighter">
										{spot.genre}
									</span>
									{spot.tags &&
										spot.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="text-[10px] text-gray-400 font-bold"
											>
												#{tag}
											</span>
										))}
								</div>

								<p className="text-xs text-gray-500 line-clamp-1 flex items-center gap-1.5 opacity-80">
									<span className="text-primary text-sm">📍</span>{' '}
									{spot.address}
								</p>

								<AnimatePresence>
									{selectedSpotId === spot.id && spot.description && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
										>
											<p className="text-xs text-gray-600 leading-relaxed italic">
												{spot.description}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
