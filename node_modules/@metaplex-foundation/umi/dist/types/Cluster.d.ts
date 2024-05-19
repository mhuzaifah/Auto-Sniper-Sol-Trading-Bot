/**
 * Defines the available Solana clusters.
 * @category Utils — Cluster
 */
export type Cluster = 'mainnet-beta' | 'devnet' | 'testnet' | 'localnet' | 'custom';
/**
 * Helper type to helps the end-user selecting a cluster.
 * They can either provide a specific cluster or use the
 * special values 'current' or '*' to select the current
 * cluster or all clusters respectively.
 * @category Utils — Cluster
 */
export type ClusterFilter = Cluster | 'current' | '*';
/**
 * Helper method that tries its best to resolve a cluster from a given endpoint.
 * @category Utils — Cluster
 */
export declare const resolveClusterFromEndpoint: (endpoint: string) => Cluster;
