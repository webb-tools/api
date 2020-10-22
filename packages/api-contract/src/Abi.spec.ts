// Copyright 2017-2020 @polkadot/api-contract authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Abi from './Abi';

import * as testContracts from '../test/contracts';

const abis: Record<string, any> = { ...testContracts };

function compareInterface (name: string, messageIds: string[]): void {
  try {
    const inkAbi = new Abi(abis[name]);

    expect(inkAbi.messages.map(({ identifier }) => identifier)).toEqual(messageIds);
  } catch (error) {
    console.error(error);

    throw error;
  }
}

interface JSONAbi {
  spec: {
    messages: {
      name: string[] | string
    }[]
  }
}

describe('Abi', (): void => {
  Object.entries(abis).forEach(([abiName, abi]) => {
    it(`initializes from a contract ABI (${abiName})`, (): void => {
      compareInterface(abiName, (abi as JSONAbi).spec.messages.map(({ name }) => Array.isArray(name) ? name[0] : name));
    });
  });
});
