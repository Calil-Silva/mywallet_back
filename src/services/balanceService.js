import dayjs from 'dayjs';
import * as balanceRepository from '../repositories/balanceRepository.js';

async function listEntries({ userId }) {
  const listBalances = await balanceRepository.findUserBalancesByUserId({
    userId,
  });

  return listBalances.map((b) => ({
    date: dayjs(b.date).format('DD/MM/YY'),
    description: b.description,
    balance: b.balance,
  }));
}

export { listEntries };
